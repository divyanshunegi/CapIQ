import { FiActivity, FiUpload, FiImage } from 'react-icons/fi';
import { Icon } from './Icon';

const Activity = () => {
  return (
    <div className="rounded-lg backdrop-blur-md p-6 mb-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Icon icon={FiActivity} className="text-[#72FF85]" />
        Recent Activity
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'rgba(39, 150, 143, 0.3)' }}>
          <div className="flex items-center gap-3">
            <Icon icon={FiUpload} className="text-[#72FF85]" />
            <div>
              <p className="text-white font-medium">Import Complete</p>
              <p className="text-white/70 text-sm">156 new photos added</p>
            </div>
          </div>
          <span className="text-[#49EBF6] text-sm">Just now</span>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'rgba(39, 150, 143, 0.3)' }}>
          <div className="flex items-center gap-3">
            <Icon icon={FiImage} className="text-[#72FF85]" />
            <div>
              <p className="text-white font-medium">Processing Videos</p>
              <p className="text-white/70 text-sm">3 videos remaining</p>
            </div>
          </div>
          <span className="text-[#49EBF6] text-sm">2 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default Activity; 