/** @jsx jsx */
/** @jsxRuntime classic */
import { array, func, number, object, string } from 'prop-types';
import { jsx } from 'theme-ui';

const CarouselDots = ({
  handleClick,
  visibility,
  options,
  slideIndexes,
  currentSlide,
}) => {
  return (
    <div
      sx={{
        gridArea: 'dots',
        flexDirection: options.vertical ? 'column' : null,
        zIndex: 1,
        padding: 2,
        placeSelf: 'center',
        mixBlendMode: 'screen',
        display:
          visibility === 'touch' || visibility === 'both' ? 'flex' : 'none',
        '@media (pointer: fine)': {
          display:
            visibility === 'desktop' || visibility === 'both' ? 'flex' : 'none',
        },
      }}
    >
      {slideIndexes.map((slide) => {
        const disabled = slide === currentSlide;
        return (
          <button
            disabled={disabled}
            key={slide}
            onClick={() => handleClick(slide)}
            sx={{
              background: disabled ? 'white' : 'none',
              color: disabled ? 'black' : 'white',
              mixBlendMode: 'screen',
              userSelect: 'none',
              size: 40,
              border: 0,
              padding: 0,
              opacity: 0.7,
              outline: 'none',
              fontWeight: 'bold',
              fontSize: disabled ? 3 : 2,
              borderRadius: '50%',
              transition: 'all 0.2s',
              '@media (pointer: fine)': {
                ':hover': {
                  opacity: disabled ? null : 0.9,
                  fontSize: 3,
                },
              },
            }}
          >
            {slide + 1}
          </button>
        );
      })}
    </div>
  );
};

CarouselDots.propTypes = {
  currentSlide: number.isRequired,
  handleClick: func.isRequired,
  options: object.isRequired,
  slideIndexes: array.isRequired,
  visibility: string.isRequired,
};

export default CarouselDots;
