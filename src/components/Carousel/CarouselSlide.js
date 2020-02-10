/** @jsx jsx */
import { func, node, number } from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { jsx } from 'theme-ui';

const CarouselSlide = ({ slideIndex, updateUI, children }) => {
  const [ref, inView] = useInView({
    threshold: 0.6,
  });

  if (inView) {
    setTimeout(() => {
      updateUI(slideIndex);
    }, 0);
    /*  Todo: fix this properly without timer. Without it, this triggers last and resets state to previous slide.
    Behavior smooth fixes this but isn't supported in Safari. */
  }

  return (
    <div
      id={`slide-${slideIndex}`}
      key={slideIndex}
      ref={ref}
      sx={{ scrollSnapAlign: 'center', size: '100%' }}
    >
      {children}
    </div>
  );
};

CarouselSlide.propTypes = {
  children: node.isRequired,
  slideIndex: number.isRequired,
  updateUI: func.isRequired,
};

export default CarouselSlide;
