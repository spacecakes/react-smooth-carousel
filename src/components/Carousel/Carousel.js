/** @jsx jsx */
/** @jsxRuntime classic */
import { node, number, object } from 'prop-types';
import { Children, useCallback, useEffect, useState } from 'react';
import { jsx } from 'theme-ui';

import CarouselButton from './CarouselButton';
import CarouselDots from './CarouselDots';
import CarouselSlide from './CarouselSlide';
import CarouselView from './CarouselView';

const Carousel = ({ initialSlide, children, options, controls }) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const slideIndexes = Children.map(children, (child, index) => index);

  const handleSlideChange = (slideIndex) => {
    /* Restart from end or beginning if index out of bounds */
    if (slideIndex > slideIndexes.length - 1) {
      if (options.loop) {
        slideIndex = 0;
      }
    } else if (slideIndex < 0) {
      if (options.loop) {
        slideIndex = slideIndexes.length - 1;
      }
    }
    scrollTo(slideIndex);
  };

  const nextSlide = () => handleSlideChange(currentSlide + 1);
  const prevSlide = () => handleSlideChange(currentSlide - 1);

  const isLast = currentSlide === slideIndexes.length - 1 && !options.loop;
  const isFirst = currentSlide === 0 && !options.loop;

  const scrollTo = useCallback(
    (slideIndex) => {
      const scrollOptions = {
        behavior: options.smooth ? 'smooth' : 'auto',
        block: 'center',
        inline: 'center',
      };

      document
        .getElementById(`slide-${slideIndex}`)
        .scrollIntoView(scrollOptions);
    },
    [options.smooth]
  );

  const updateUI = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    handleSlideChange(initialSlide);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [initialSlide]);

  return (
    <div
      sx={{
        size: '100%',
        display: 'grid',
        gridTemplate: options.vertical
          ? `
            "prev . dots"
            "next . dots"
            / auto 1fr auto
          `
          : `
            "prev .... next" 1fr
            "prev dots next" auto
            / auto 1fr auto
          `,
      }}
    >
      <CarouselView options={options}>
        {Children.map(children, (child, index) => (
          <CarouselSlide key={index} slideIndex={index} updateUI={updateUI}>
            {child}
          </CarouselSlide>
        ))}
      </CarouselView>

      <CarouselDots
        currentSlide={currentSlide}
        handleClick={handleSlideChange}
        options={options}
        slideIndexes={slideIndexes}
        visibility={controls.dots}
      />

      <CarouselButton
        disabled={isFirst}
        gridArea='prev'
        handleClick={prevSlide}
        orientation={options.vertical ? 'up' : 'left'}
        visibility={controls.arrows}
      />

      <CarouselButton
        disabled={isLast}
        gridArea='next'
        handleClick={nextSlide}
        orientation={options.vertical ? 'down' : 'right'}
        visibility={controls.arrows}
      />
    </div>
  );
};

Carousel.defaultProps = {
  controls: {
    dots: 'both',
    arrows: 'desktop',
  },
  initialSlide: 0,
  options: {
    loop: false,
    slideGap: null,
    slidesVisible: 1,
    smooth: true,
    dotsOnTouch: true,
    dotsOnDesktop: true,
  },
};

Carousel.propTypes = {
  children: node.isRequired,
  controls: object,
  initialSlide: number,
  options: object,
};

export default Carousel;
