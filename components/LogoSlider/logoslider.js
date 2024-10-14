import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './LogoSlider.module.css';

const LogoSlider = ({ logos }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationId;

    const animate = () => {
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className={styles.logoSliderContainer}>
      <div className={styles.logoSlider} ref={sliderRef}>
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className={styles.logoWrapper}>
            <Image
            src={logo.src}
            alt={logo.alt}
            width={200} // Increased from 100
            height={120} // Increased from 50, maintaining aspect ratio
            className={styles.logo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;