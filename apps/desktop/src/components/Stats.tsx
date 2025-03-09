import { FiClock, FiCopy, FiStar } from 'react-icons/fi';
import { MdBlurOn } from 'react-icons/md';
import { Icon } from './Icon';

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div className="rounded-lg backdrop-blur-md p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#49EBF6] mb-2 flex items-center gap-2">
              <Icon icon={FiClock} className="text-xl" />
              Recent Media
            </p>
            <h3 className="text-2xl font-bold text-white">156</h3>
            <p className="text-white/70 text-sm">new photos added</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg backdrop-blur-md p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#49EBF6] mb-2 flex items-center gap-2">
              <Icon icon={FiCopy} className="text-xl" />
              Duplicates Found
            </p>
            <h3 className="text-2xl font-bold text-white">28</h3>
            <p className="text-white/70 text-sm">potential duplicate images</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg backdrop-blur-md p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#49EBF6] mb-2 flex items-center gap-2">
              <Icon icon={MdBlurOn} className="text-xl" />
              Quality Check
            </p>
            <h3 className="text-2xl font-bold text-white">15</h3>
            <p className="text-white/70 text-sm">blurred photos identified</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg backdrop-blur-md p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#49EBF6] mb-2 flex items-center gap-2">
              <Icon icon={FiStar} className="text-xl" />
              Best Shots
            </p>
            <h3 className="text-2xl font-bold text-white">42</h3>
            <p className="text-white/70 text-sm">high-quality images selected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats; 