/** @jsx jsx */
import { node, number, object } from 'prop-types';
import { Children, Fragment, useCallback, useEffect, useState } from 'react';
import { jsx } from 'theme-ui';

import CarouselButton from './CarouselButton';
import CarouselDots from './CarouselDots';
import CarouselSlide from './CarouselSlide';
import CarouselView from './CarouselView';

const Carousel = ({ initialSlide, children, options }) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const slideIndexes = Children.map(children, (child, index) => index);

  const handleClick = slideIndex => {
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

  const nextSlide = () => handleClick(currentSlide + 1);
  const prevSlide = () => handleClick(currentSlide - 1);

  const isLast = currentSlide === slideIndexes.length - 1 && !options.loop;
  const isFirst = currentSlide === 0 && !options.loop;

  const scrollTo = useCallback(
    slideIndex => {
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

      {options.dots ? (
        <CarouselDots
          currentSlide={currentSlide}
          handleClick={handleClick}
          slideIndexes={slideIndexes}
          vertical={options.vertical}
        />
      ) : null}

      {options.arrows ? (
        <Fragment>
          <CarouselButton
            disabled={isFirst}
            handleClick={prevSlide}
            prev
            vertical={options.vertical}
          />
          <CarouselButton
            disabled={isLast}
            handleClick={nextSlide}
            vertical={options.vertical}
          />
        </Fragment>
      ) : null}
    </div>
  );
};

Carousel.defaultProps = {
  initialSlide: 1,
  options: {
    loop: false,
    slideGap: null,
    slidesVisible: 1,
    smooth: true,
    dots: true,
    arrows: true,
  },
};

Carousel.propTypes = {
  children: node.isRequired,
  initialSlide: number,
  options: object,
};

export default Carousel;
