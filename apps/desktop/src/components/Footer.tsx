const Footer = () => {
  return (
    <footer className="relative border-t border-[#27968F]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-white">
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#49EBF6' }}>About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-[#72FF85]">Company</a></li>
              <li><a href="#" className="text-white hover:text-[#72FF85]">Team</a></li>
              <li><a href="#" className="text-white hover:text-[#72FF85]">Careers</a></li>
            </ul>
          </div>
          <div className="text-white">
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#49EBF6' }}>Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-[#72FF85]">Documentation</a></li>
              <li><a href="#" className="text-white hover:text-[#72FF85]">Help Center</a></li>
              <li><a href="#" className="text-white hover:text-[#72FF85]">API</a></li>
            </ul>
          </div>
          <div className="text-white">
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#49EBF6' }}>Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-[#72FF85]">Privacy</a></li>
              <li><a href="#" className="text-white hover:text-[#72FF85]">Terms</a></li>
              <li><a href="#" className="text-white hover:text-[#72FF85]">Security</a></li>
            </ul>
          </div>
          <div className="text-white">
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#49EBF6' }}>Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-[#72FF85]">Twitter</a></li>
              <li><a href="#" className="text-white hover:text-[#72FF85]">LinkedIn</a></li>
              <li><a href="#" className="text-white hover:text-[#72FF85]">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t" style={{ borderColor: '#27968F' }}>
          <p className="text-center" style={{ color: '#49EBF6' }}>&copy; 2024 CaptureIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 