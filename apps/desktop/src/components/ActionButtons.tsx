const ActionButtons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button className="p-6 rounded-lg backdrop-blur-md text-left transition-all hover:transform hover:scale-105" 
        style={{ backgroundColor: 'rgba(39, 150, 143, 0.3)' }}>
        <h3 className="text-lg font-semibold mb-2 text-white">View Duplicates</h3>
        <p className="text-white opacity-90">Review and manage duplicate images</p>
      </button>
      <button className="p-6 rounded-lg backdrop-blur-md text-left transition-all hover:transform hover:scale-105"
        style={{ backgroundColor: 'rgba(39, 150, 143, 0.3)' }}>
        <h3 className="text-lg font-semibold mb-2 text-white">Check Quality</h3>
        <p className="text-white opacity-90">Analyze and fix image quality issues</p>
      </button>
      <button className="p-6 rounded-lg backdrop-blur-md text-left transition-all hover:transform hover:scale-105"
        style={{ backgroundColor: 'rgba(39, 150, 143, 0.3)' }}>
        <h3 className="text-lg font-semibold mb-2 text-white">Browse Best Shots</h3>
        <p className="text-white opacity-90">View your highest quality images</p>
      </button>
    </div>
  );
};

export default ActionButtons; 