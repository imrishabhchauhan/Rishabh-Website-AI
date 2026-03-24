export default function Footer() {
  return (
    <footer className="bg-dark-bg text-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-[20px] md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-dm-sans text-sm text-white/60">
            © 2026 Rishabh Chauhan. Built with intent.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/rishabhchauhan25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors font-jetbrains text-sm"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors font-jetbrains text-sm"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors font-jetbrains text-sm"
            >
              Twitter
            </a>
          </div>

          <div className="font-syne font-bold text-lg text-white">
            aiwithrishabh.com
          </div>
        </div>
      </div>
    </footer>
  );
}
