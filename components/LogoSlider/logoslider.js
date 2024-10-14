import React from 'react';
import Image from 'next/image';
import styles from './LogoSlider.module.css';

const LogoSlider = ({ logos }) => {
  return (
    <div className={styles.logoSliderContainer}>
      <div className={styles.logoSlider}>
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className={styles.logoWrapper}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={90}
              className={styles.logo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;