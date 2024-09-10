import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles

const SplideTest = () => {
  return (
    <div>
      <h1>Nested Splide Carousel</h1>
      <Splide aria-label="Main Carousel" options={{ type: 'loop', perPage: 1 }}>
        <SplideSlide>
          <h2>Slide 1</h2>
          <Splide aria-label="Nested Carousel" options={{ type: 'loop', perPage: 3, gap: '1rem' }}>
            <SplideSlide>
              <img src="/images/20221126_142049.jpg" alt="Nested Image 1" />
            </SplideSlide>
            <SplideSlide>
              <img src="/images/20221126_142053.jpg" alt="Nested Image 2" />
            </SplideSlide>
            <SplideSlide>
              <img src="image3.jpg" alt="Nested Image 3" />
            </SplideSlide>
          </Splide>
        </SplideSlide>
        <SplideSlide>
          <h2>Slide 2</h2>
          <Splide aria-label="Nested Carousel" options={{ type: 'loop', perPage: 3, gap: '1rem' }}>
            <SplideSlide>
              <img src="/images/20221126_142053.jpg" alt="Nested Image 4" />
            </SplideSlide>
            <SplideSlide>
              <img src="/images/20221126_142049.jpg" alt="Nested Image 5" />
            </SplideSlide>
            <SplideSlide>
              <img src="image6.jpg" alt="Nested Image 6" />
            </SplideSlide>
          </Splide>
        </SplideSlide>
      </Splide>
    </div>
  );
};
