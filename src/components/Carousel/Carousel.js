/** @jsx jsx */
import { bool, node, number, string } from 'prop-types';
import { Children, useCallback, useEffect, useState } from 'react';
import { jsx } from 'theme-ui';

import CarouselButton from './CarouselButton';
import CarouselDots from './CarouselDots';
import CarouselSlide from './CarouselSlide';
import CarouselView from './CarouselView';

const Carousel = ({
  slidesVisible,
  vertical,
  slideGap,
  initialSlide,
  children,
  loopAround,
  smooth,
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const slideIndexes = Children.map(children, (child, index) => index);

  const handleClick = slideIndex => {
    /* Restart from end or beginning if index out of bounds */
    if (slideIndex > slideIndexes.length - 1) {
      if (loopAround) {
        slideIndex = 0;
      }
    } else if (slideIndex < 0) {
      if (loopAround) {
        slideIndex = slideIndexes.length - 1;
      }
    }
    scrollTo(slideIndex);
  };

  const nextSlide = () => handleClick(currentSlide + 1);
  const prevSlide = () => handleClick(currentSlide - 1);

  const scrollTo = useCallback(
    slideIndex => {
      const scrollOptions = {
        behavior: smooth ? 'smooth' : 'auto',
        block: 'center',
        inline: 'center',
      };

      document
        .getElementById(`slide-${slideIndex}`)
        .scrollIntoView(scrollOptions);
    },
    [smooth]
  );

  const updateUI = index => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    scrollTo(initialSlide);
  }, [initialSlide, scrollTo]);

  return (
    <div
      sx={{
        size: '100%',
        display: 'grid',
        gridTemplate: vertical
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
      <CarouselView
        slideGap={slideGap}
        slidesVisible={slidesVisible}
        vertical={vertical}
      >
        {Children.map(children, (child, index) => (
          <CarouselSlide key={index} slideIndex={index} updateUI={updateUI}>
            {child}
          </CarouselSlide>
        ))}
      </CarouselView>

      <CarouselButton
        disabled={currentSlide === 0 && !loopAround}
        handleClick={prevSlide}
        prev
        vertical={vertical}
      />

      <CarouselDots
        currentSlide={currentSlide}
        handleClick={handleClick}
        slideIndexes={slideIndexes}
        vertical={vertical}
      />

      <CarouselButton
        disabled={currentSlide === slideIndexes.length - 1 && !loopAround}
        handleClick={nextSlide}
        vertical={vertical}
      />
    </div>
  );
};

Carousel.defaultProps = {
  initialSlide: 1,
  loopAround: false,
  slideGap: '0',
  slidesVisible: 1, // Not yet implemented. Don't change.
  smooth: true,
  vertical: false,
};

Carousel.propTypes = {
  children: node.isRequired,
  initialSlide: number,
  loopAround: bool,
  slideGap: string,
  slidesVisible: number,
  smooth: bool,
  vertical: bool,
};

export default Carousel;
