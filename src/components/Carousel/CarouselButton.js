/** @jsx jsx */
/** @jsxRuntime classic */
import { bool, func, string } from 'prop-types';
import { jsx } from 'theme-ui';

const CarouselButton = ({
  handleClick,
  visibility,
  gridArea,
  orientation,
  disabled,
}) => {
  const rotate = { up: 180, down: 0, left: 90, right: -90 };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      sx={{
        display:
          visibility === 'touch' || visibility === 'both' ? 'block' : 'none',
        zIndex: 1,
        gridArea,
        background: 'none',
        outline: 'none',
        border: 0,
        padding: 2,
        color: 'white',
        opacity: disabled ? 0.4 : 0.7,
        minInlineSize: 70,
        minBlockSize: 70,
        userSelect: 'none',
        size: '100%',
        transition: 'all 0.2s',
        '@media (pointer: fine)': {
          display:
            visibility === 'desktop' || visibility === 'both'
              ? 'block'
              : 'none',
          ':hover': {
            opacity: disabled ? null : 0.9,
            transform: 'scale(1.03)',
          },
        },
      }}
    >
      <svg
        sx={{ transform: `rotate(${rotate[orientation]}deg)`, size: 50 }}
        viewBox='0 -256 1792 1792'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1679 302q0 53-37 90l-651 651q-38 38-91 38-54 0-90-38L159 392q-38-36-38-90 0-53 38-91l74-75q39-37 91-37 53 0 90 37l486 486 486-486q37-37 90-37 52 0 91 37l75 75q37 39 37 91z'
          fill='currentColor'
        />
      </svg>
    </button>
  );
};

CarouselButton.propTypes = {
  disabled: bool.isRequired,
  gridArea: string.isRequired,
  handleClick: func.isRequired,
  orientation: string.isRequired,
  visibility: string.isRequired,
};

export default CarouselButton;
