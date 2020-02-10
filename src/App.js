/** @jsx jsx */
import { useState } from 'react';
import { jsx } from 'theme-ui';

import Carousel from './components/Carousel';
import slides from './slides.json';

function App() {
  const [vertical, setVertical] = useState(false);
  const [loop, setLoop] = useState(false);
  const [smooth, setSmooth] = useState(true);
  const [slideGap, setSlideGap] = useState(0);
  const [initialSlide, setInitialSlide] = useState(0);

  return (
    <div style={{ minHeight: 400, height: '40vw', maxHeight: 700 }}>
      <Carousel
        initialSlide={initialSlide}
        loopAround={loop}
        slideGap={slideGap}
        smooth={smooth}
        vertical={vertical}
      >
        {slides.map(slide => (
          <img
            alt={slide.alt}
            key={slide.src}
            src={slide.src}
            sx={{ size: '100%', objectFit: 'cover' }}
          />
        ))}
      </Carousel>

      <section sx={{ padding: 4, margin: 'auto', maxWidth: 500 }}>
        <h1 sx={{ fontSize: 3 }}>Carousel Demo</h1>
        <p>
          Modern carousel based on CSS snapping points, Grid, Intersection
          Observer & scrollIntoView. Fully responsive: no absolute positioning,
          will always be as big as its parent. Native scrolling behavior. No
          scroll hijacking.
        </p>
        <p>Swipe me!</p>

        <h2 sx={{ fontSize: 2 }}>Props</h2>
        <button onClick={() => setVertical(val => !val)}>
          {vertical ? 'Horizontal' : 'Vertical'}
        </button>
        <button onClick={() => setLoop(val => !val)}>
          {loop ? "Don't loop" : 'Loop'}
        </button>
        <button onClick={() => setSmooth(val => !val)}>
          {smooth ? 'Instant transition' : 'Smooth transition'}
        </button>

        <br />

        <label sx={{ display: 'flex', marginY: 2 }}>
          <input
            onChange={e => setSlideGap(e.currentTarget.value)}
            sx={{ marginRight: 2 }}
            type="text"
            value={slideGap}
          />
          gap (%, px)
        </label>

        <label sx={{ display: 'flex', marginY: 2 }}>
          <input
            max={slides.length - 1}
            min="0"
            onChange={e => setInitialSlide(e.currentTarget.value)}
            sx={{ marginRight: 2 }}
            type="number"
            value={initialSlide}
          />
          starting point
        </label>
      </section>
    </div>
  );
}

export default App;
