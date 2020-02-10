/** @jsx jsx */
import { node, object } from 'prop-types';
import { jsx } from 'theme-ui';

const CarouselView = ({ children, options }) => {
  const horizontalStyle = {
    gridAutoFlow: 'column',
    gridAutoColumns: `${100 / options.slidesVisible}%`,
    gridAutoRows: '100%',
    overflowY: 'hidden',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
  };

  const verticalStyle = {
    gridAutoFlow: 'row',
    gridAutoColumns: '100%',
    gridAutoRows: `${100 / options.slidesVisible}%`,
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollSnapType: 'y mandatory',
  };

  return (
    <div
      sx={{
        ...(options.vertical ? verticalStyle : horizontalStyle),
        display: 'grid',
        gridArea: '1 / 1 / -1 / -1',
        gridGap: options.slideGap,
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
  options: object.isRequired,
};

export default CarouselView;
