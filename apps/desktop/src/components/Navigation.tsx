import { FiSearch, FiUpload } from 'react-icons/fi';
import { Icon } from '../components/Icon';
import logo from '../assets/logo/icon.png';

const Navigation = () => {
  return (
    <nav className="fixed w-full z-50 shadow-sm backdrop-blur-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <img src={logo} className="h-8 w-8" alt="logo" />
            <span className="ml-2 text-xl font-semibold text-white">CapIQ</span>
          </div>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Icon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#72FF85] focus:border-transparent"
              />
            </div>
          </div>
          <button 
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            style={{ backgroundColor: '#27968F' }}
          >
            <Icon icon={FiUpload} />
            Import Media
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 