import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './LogoSlider.module.css';

const LogoSlider = ({ logos }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size on load and resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    handleResize(); // Call it on initial load

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.logoSliderContainer}>
      <div className={styles.logoSlider}>
        {logos.concat(logos).concat(logos).map((logo, index) => (
          <div
            key={index}
            className={styles.logoWrapper}
            style={{ padding: isMobile ? '0 10px' : '0 20px' }} // Conditional padding
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={isMobile ? 120 : 250} // Conditional width
              height={isMobile ? 50 : 90} // Conditional height
              className={styles.logo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;
