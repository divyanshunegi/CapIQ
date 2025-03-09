import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Activity from './components/Activity';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="relative bg-[#011613] min-h-screen">
      <Navigation />
      <Hero />

      {/* Second Section with Components */}
      <section id="features" className="relative py-20 scroll-mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 30% 20%, #72FF85 0%, transparent 50%), radial-gradient(circle at 70% 60%, #49EBF6 0%, transparent 50%)', 
            filter: 'blur(100px)'
          }}></div>
        </div>

        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Stats />
            <Activity />
            <ActionButtons />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
