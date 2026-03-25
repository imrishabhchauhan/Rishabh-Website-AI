'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Palette, 
  FileText, 
  DollarSign, 
  Plus, 
  Trash2, 
  Save, 
  LogOut, 
  LogIn, 
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  auth, 
  db, 
  storage, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  collection, 
  getDocs, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  OperationType,
  handleFirestoreError,
  User
} from '@/firebase';

const ADMIN_EMAIL = "imrishabh.work@gmail.com";
const STORAGE_LIMIT_MB = 999;
const STORAGE_LIMIT_BYTES = STORAGE_LIMIT_MB * 1024 * 1024;

export default function AdminSettings() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Site Settings State
  const [settings, setSettings] = useState({
    accentColor: '#0066ff',
    accentGlowColor: '#3b82f6',
    resumeUrl: '',
    status: 'Open to Work',
    servicePrices: {
      aiWorkflow: '15000',
      marketing: '8000',
      content: '5000'
    },
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    },
    fontFamily: '--font-dm-sans',
    showServices: true,
    showWork: true,
    showContact: true
  });

  // Projects State
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'AI Automation',
    description: '',
    imageUrl: '',
    tags: '',
    participants: '',
    featured: false
  });

  // Storage Stats
  const [totalBytes, setTotalBytes] = useState(0);
  const [activeTab, setActiveTab] = useState<'appearance' | 'content' | 'pricing' | 'projects' | 'social'>('appearance');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u && u.email === ADMIN_EMAIL) {
        fetchData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Settings
      const settingsDoc = await getDoc(doc(db, 'settings', 'site-config'));
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data() as any);
      }

      // Fetch Projects
      const projectsSnap = await getDocs(collection(db, 'projects'));
      setProjects(projectsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch Storage Stats
      const statsDoc = await getDoc(doc(db, 'stats', 'storage'));
      if (statsDoc.exists()) {
        setTotalBytes(statsDoc.data().totalBytes || 0);
      } else {
        // Initialize stats if not exists
        await setDoc(doc(db, 'stats', 'storage'), { totalBytes: 0 });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'admin-data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site-config'), settings);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/site-config');
      setMessage({ type: 'error', text: 'Failed to save settings.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleFileUpload = async (file: File, type: 'resume' | 'project') => {
    if (totalBytes + file.size > STORAGE_LIMIT_BYTES) {
      alert("Firebase Free Plan Supports only 1GB of Storage");
      return null;
    }

    const storageRef = ref(storage, `${type}/${Date.now()}_${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      // Update total bytes
      const newTotal = totalBytes + file.size;
      await updateDoc(doc(db, 'stats', 'storage'), { totalBytes: newTotal });
      setTotalBytes(newTotal);
      
      return url;
    } catch (error) {
      console.error("Upload failed", error);
      return null;
    }
  };

  const addProject = async () => {
    setSaving(true);
    try {
      const projectData = {
        ...newProject,
        tags: newProject.tags.split(',').map(t => t.trim()),
        createdAt: new Date().toISOString()
      };
      const docRef = doc(collection(db, 'projects'));
      await setDoc(docRef, projectData);
      setProjects([...projects, { id: docRef.id, ...projectData }]);
      setNewProject({
        title: '',
        category: 'AI Automation',
        description: '',
        imageUrl: '',
        tags: '',
        participants: '',
        featured: false
      });
      setMessage({ type: 'success', text: 'Project added!' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'projects');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const deleteProject = async (id: string, imageUrl: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      
      // If image is in Firebase Storage, try to delete it
      if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (e) {
          console.warn("Could not delete image from storage", e);
        }
      }
      
      setProjects(projects.filter(p => p.id !== id));
      setMessage({ type: 'success', text: 'Project deleted!' });
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface p-8 rounded-3xl border border-border-subtle max-w-md w-full shadow-xl"
        >
          <Settings className="w-12 h-12 text-accent mx-auto mb-6" />
          <h1 className="font-syne text-2xl font-bold text-text-primary mb-2">Admin Access</h1>
          <p className="text-text-secondary mb-8">Please sign in with your authorized admin account to manage your portfolio.</p>
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-accent text-white py-4 rounded-full font-medium hover:bg-accent-glow transition-all"
          >
            <LogIn size={20} />
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-text-primary p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="font-syne text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">Manage your portfolio content and settings.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">{user.displayName}</p>
              <p className="text-xs text-text-secondary">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-3 rounded-full bg-surface border border-border-subtle text-text-secondary hover:text-accent transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-2xl flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{message.text}</span>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
          {[
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'pricing', label: 'Pricing', icon: DollarSign },
            { id: 'projects', label: 'Projects', icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-surface text-text-secondary hover:bg-border-subtle border border-border-subtle'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Palette className="text-accent" size={24} />
                  <h2 className="font-syne font-bold text-2xl">Appearance</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Accent Color</label>
                    <div className="flex gap-4">
                      <input 
                        type="color" 
                        value={settings.accentColor}
                        onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                        className="w-16 h-16 rounded-xl cursor-pointer bg-transparent border-none"
                      />
                      <input 
                        type="text" 
                        value={settings.accentColor}
                        onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                        className="flex-1 bg-base border border-border-subtle rounded-xl px-6 text-lg font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Accent Glow</label>
                    <div className="flex gap-4">
                      <input 
                        type="color" 
                        value={settings.accentGlowColor}
                        onChange={(e) => setSettings({...settings, accentGlowColor: e.target.value})}
                        className="w-16 h-16 rounded-xl cursor-pointer bg-transparent border-none"
                      />
                      <input 
                        type="text" 
                        value={settings.accentGlowColor}
                        onChange={(e) => setSettings({...settings, accentGlowColor: e.target.value})}
                        className="flex-1 bg-base border border-border-subtle rounded-xl px-6 text-lg font-mono"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <button 
                    onClick={saveSettings}
                    disabled={saving}
                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-accent text-white px-10 py-4 rounded-full font-medium hover:bg-accent-glow transition-all disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Appearance
                  </button>
                </div>
              </motion.section>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm"
              >
                <div className="flex items-center gap-3 mb-8">
                  <FileText className="text-accent" size={24} />
                  <h2 className="font-syne font-bold text-2xl">Content & Links</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Status Label</label>
                    <input 
                      type="text" 
                      value={settings.status}
                      onChange={(e) => setSettings({...settings, status: e.target.value})}
                      className="w-full bg-base border border-border-subtle rounded-xl px-6 py-4 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Resume URL</label>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        value={settings.resumeUrl}
                        onChange={(e) => setSettings({...settings, resumeUrl: e.target.value})}
                        className="flex-1 bg-base border border-border-subtle rounded-xl px-6 py-4 text-lg"
                      />
                      <label className="cursor-pointer bg-accent/10 text-accent p-4 rounded-xl hover:bg-accent/20 transition-colors">
                        <Plus size={24} />
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(file, 'resume');
                              if (url) setSettings({...settings, resumeUrl: url});
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <button 
                    onClick={saveSettings}
                    disabled={saving}
                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-accent text-white px-10 py-4 rounded-full font-medium hover:bg-accent-glow transition-all disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Content
                  </button>
                </div>
              </motion.section>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm"
              >
                <div className="flex items-center gap-3 mb-8">
                  <DollarSign className="text-accent" size={24} />
                  <h2 className="font-syne font-bold text-2xl">Service Pricing</h2>
                </div>
                <div className="space-y-6">
                  {Object.entries(settings.servicePrices).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary text-lg">$</span>
                        <input 
                          type="text" 
                          value={value}
                          onChange={(e) => setSettings({
                            ...settings, 
                            servicePrices: {...settings.servicePrices, [key]: e.target.value}
                          })}
                          className="w-full bg-base border border-border-subtle rounded-xl pl-12 pr-6 py-4 text-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <button 
                    onClick={saveSettings}
                    disabled={saving}
                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-accent text-white px-10 py-4 rounded-full font-medium hover:bg-accent-glow transition-all disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Pricing
                  </button>
                </div>
              </motion.section>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm"
              >
                <div className="flex items-center gap-3 mb-8">
                  <ImageIcon className="text-accent" size={24} />
                  <h2 className="font-syne font-bold text-2xl">Manage Projects</h2>
                </div>

                {/* Add New Project Form */}
                <div className="bg-base p-8 rounded-2xl border border-border-subtle mb-12">
                  <h3 className="font-bold text-lg mb-6">Add New Project</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Title</label>
                      <input 
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="w-full bg-surface border border-border-subtle rounded-xl px-6 py-4 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Category</label>
                      <select 
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        className="w-full bg-surface border border-border-subtle rounded-xl px-6 py-4 text-sm"
                      >
                        <option>AI Automation</option>
                        <option>Content Systems</option>
                        <option>Marketing Infrastructure</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Description</label>
                    <textarea 
                      placeholder="What did you build?"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="w-full bg-surface border border-border-subtle rounded-xl px-6 py-4 text-sm h-32"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Image URL</label>
                      <div className="flex gap-3">
                        <input 
                          placeholder="https://..."
                          value={newProject.imageUrl}
                          onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                          className="flex-1 bg-surface border border-border-subtle rounded-xl px-6 py-4 text-sm"
                        />
                        <label className="cursor-pointer bg-accent/10 text-accent p-4 rounded-xl hover:bg-accent/20 transition-colors">
                          <Plus size={24} />
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleFileUpload(file, 'project');
                                if (url) setNewProject({...newProject, imageUrl: url});
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Tags</label>
                      <input 
                        placeholder="AI, Automation, N8N"
                        value={newProject.tags}
                        onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                        className="w-full bg-surface border border-border-subtle rounded-xl px-6 py-4 text-sm"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={addProject}
                    disabled={saving || !newProject.title}
                    className="w-full bg-accent text-white py-4 rounded-full font-medium hover:bg-accent-glow transition-all disabled:opacity-50"
                  >
                    Add Project
                  </button>
                </div>

                {/* Projects List */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg mb-4">Existing Projects ({projects.length})</h3>
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-5 bg-base rounded-2xl border border-border-subtle hover:border-accent/30 transition-all">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-xl bg-surface overflow-hidden border border-border-subtle">
                          {project.imageUrl && <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{project.title}</h4>
                          <p className="text-sm text-text-secondary">{project.category}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteProject(project.id, project.imageUrl)}
                        className="p-3 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar: Stats */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm sticky top-8">
              <h3 className="font-syne font-bold text-xl mb-6">System Info</h3>
              
              {/* Storage Usage */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Storage Usage</span>
                  <span className="text-xs font-bold text-text-secondary">{(totalBytes / (1024 * 1024)).toFixed(2)} / {STORAGE_LIMIT_MB} MB</span>
                </div>
                <div className="w-full h-3 bg-base rounded-full overflow-hidden border border-border-subtle">
                  <div 
                    className={`h-full transition-all duration-700 ${totalBytes > STORAGE_LIMIT_BYTES * 0.9 ? 'bg-red-500' : 'bg-accent'}`}
                    style={{ width: `${Math.min(100, (totalBytes / STORAGE_LIMIT_BYTES) * 100)}%` }}
                  />
                </div>
                {totalBytes > STORAGE_LIMIT_BYTES * 0.9 && (
                  <p className="text-[10px] text-red-500 mt-2 font-medium">Warning: Approaching storage limit.</p>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-border-subtle">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Admin Email</span>
                  <span className="font-medium text-xs">{ADMIN_EMAIL}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total Projects</span>
                  <span className="font-medium">{projects.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Database</span>
                  <span className="font-medium text-green-500">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
