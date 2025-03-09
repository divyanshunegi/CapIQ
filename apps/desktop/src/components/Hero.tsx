import ParallaxBackground from './ParallaxBackground';

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxBackground />
      </div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-7xl font-light text-white mb-6 tracking-tight leading-tight" style={{ 
            fontFamily: "'Outfit', sans-serif",
            textShadow: '0 0 30px rgba(114, 255, 133, 0.2), 0 0 60px rgba(73, 235, 246, 0.15)',
            letterSpacing: '-0.03em'
          }}>
            Manage Your Media
            <br />
            <span className="bg-gradient-to-r from-[#72FF85] via-[#49EBF6] to-[#72FF85] text-transparent bg-clip-text font-medium">
              Like Never Before
            </span>
          </h1>
          <p className="text-2xl text-white/90 mb-10 font-extralight tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Powerful tools for organizing, analyzing, and optimizing your media files
          </p>
          <button 
            onClick={scrollToFeatures}
            className="px-10 py-4 rounded-full text-lg font-medium text-white transition-all transform hover:scale-105 hover:shadow-glow"
            style={{ 
              backgroundColor: '#27968F',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 