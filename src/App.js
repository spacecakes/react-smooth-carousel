/** @jsx jsx */
import { useState } from 'react';
import { jsx } from 'theme-ui';

import Carousel from './components/Carousel';
import slides from './slides.json';

function App() {
  const [options, setOptions] = useState({
    loop: false,
    slideGap: '0px',
    slidesVisible: 1,
    smooth: true,
    vertical: false,
    dots: true,
    arrows: true,
  });

  const [initialSlide, setInitialSlide] = useState(0);

  const changeOption = (setting, value) =>
    setOptions({
      ...options,
      [setting]: value ? (options[setting] = value) : !options[setting],
    });

  return (
    <div style={{ minHeight: 400, height: '40vw', maxHeight: 700 }}>
      <Carousel initialSlide={initialSlide} options={options}>
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
        <p>Swipe me!</p>
        <p>
          Modern carousel based on CSS snapping points, Grid, Intersection
          Observer & scrollIntoView. Fully responsive: no absolute positioning,
          will always be as big as its parent. Native scrolling behavior,
          without hijacking.
        </p>

        <h2 sx={{ fontSize: 2 }}>Props</h2>
        <button onClick={() => changeOption('vertical')}>
          {options.vertical ? 'Horizontal' : 'Vertical'}
        </button>
        <button onClick={() => changeOption('loop')}>
          {options.loop ? "Don't loop" : 'Loop'}
        </button>
        <button onClick={() => changeOption('dots')}>
          {options.dots ? 'Hide dots' : 'Display dots'}
        </button>
        <button onClick={() => changeOption('arrows')}>
          {options.arrows ? 'Hide arrows' : 'Display arrows'}
        </button>
        <button onClick={() => changeOption('smooth')}>
          {options.smooth ? 'Instant transition' : 'Smooth transition'}
        </button>

        <br />

        <label sx={{ display: 'flex', marginY: 2 }}>
          <input
            onChange={e => changeOption('slideGap', e.currentTarget.value)}
            sx={{ marginRight: 2 }}
            type="text"
            value={options.slideGap}
          />
          gap (%, px, etc.)
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
