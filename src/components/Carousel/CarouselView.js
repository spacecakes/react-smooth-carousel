/** @jsx jsx */
import { bool, node, number } from 'prop-types';
import { jsx } from 'theme-ui';

const CarouselView = ({ children, vertical, slidesVisible, slideGap }) => {
  const horizontalStyle = {
    gridAutoFlow: 'column',
    gridAutoColumns: `${100 / slidesVisible}%`,
    gridAutoRows: '100%',
    overflowY: 'hidden',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
  };

  const verticalStyle = {
    gridAutoFlow: 'row',
    gridAutoColumns: '100%',
    gridAutoRows: `${100 / slidesVisible}%`,
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollSnapType: 'y mandatory',
  };

  return (
    <div
      sx={{
        ...(vertical ? verticalStyle : horizontalStyle),
        display: 'grid',
        gridArea: '1 / 1 / -1 / -1',
        gridGap: slideGap,
        size: '100%',
        outline: 'none',
        scrollbarWidth: 'none', // Hide scrollbar on Firefox
        '-webkit-overflow-scrolling': 'touch', // Needed to work on iOS Safari
        '::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar on Chrome & Safari
      }}
      tabIndex="0"
    >
      {children}
    </div>
  );
};

CarouselView.propTypes = {
  children: node.isRequired,
  slideGap: number.isRequired,
  slidesVisible: number.isRequired,
  vertical: bool.isRequired,
};

export default CarouselView;
