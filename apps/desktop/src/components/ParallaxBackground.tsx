import { useEffect, useState } from 'react';
import third from '../assets/images/parallax/3rd.jpeg';

const ParallaxBackground = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollPosition(window.pageYOffset);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as a percentage from the center (-1 to 1)
      const mouseXPercentage = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseYPercentage = (e.clientY / window.innerHeight - 0.5) * 2;
      
      requestAnimationFrame(() => {
        setMousePosition({ 
          x: mouseXPercentage, 
          y: mouseYPercentage 
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 w-[calc(100%+100px)] h-[calc(140%+200px)] -left-[50px] -top-[100px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x * 25}px, ${mousePosition.y * 25 + scrollPosition * 0.3}px, 0)`,
          backgroundImage: `url(${third})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
        }}
      />
      
      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(1, 22, 19, 0.2) 0%, rgba(1, 22, 19, 0.8) 100%)',
        }}
      />
    </div>
  );
};

export default ParallaxBackground; 