/** @jsx jsx */
/** @jsxRuntime classic */
import { func, node, number } from 'prop-types';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { jsx } from 'theme-ui';

const CarouselSlide = ({ slideIndex, updateUI, children }) => {
  const [ref, inView] = useInView({
    threshold: 0.6,
  });

  useEffect(() => {
    if (inView) {
      updateUI(slideIndex);
    }
  }, [inView, slideIndex, updateUI]);

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
