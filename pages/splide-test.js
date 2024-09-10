import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles

const SplideTest = () => {
  return (
    <div>
      <h1>Splide Test Page</h1>
      <Splide aria-label="test">
        <SplideSlide>
          <img src="image1.jpg" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="image2.jpg" alt="Image 2" />
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default SplideTest;