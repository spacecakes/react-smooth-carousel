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
  });

  const [controls, setControls] = useState({
    dots: 'both',
    arrows: 'desktop',
  });

  const [initialSlide, setInitialSlide] = useState(0);

  const changeOptions = e =>
    setOptions({ ...options, [e.target.name]: !options[e.target.name] });

  const changeControls = e =>
    setControls({ ...controls, [e.target.name]: e.target.value });

  return (
    <main>
      <section style={{ minHeight: 400, height: '40vw', maxHeight: 700 }}>
        <Carousel
          controls={controls}
          initialSlide={initialSlide}
          options={options}
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
      </section>

      <section
        sx={{
          padding: 4,
          margin: 'auto',
          maxWidth: 500,
          display: 'grid',
          gridGap: 3,
        }}
      >
        <h1 sx={{ fontSize: 3 }}>Carousel Demo</h1>
        <p>
          Modern carousel based on CSS snapping points, Grid, Intersection
          Observer & scrollIntoView. Fully responsive: no absolute positioning,
          will always be as big as its parent. Native scrolling behavior,
          without hijacking. Swipe me!
        </p>
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, auto)',
            gridGap: 3,
            justifyContent: 'start',
          }}
        >
          <h2 sx={{ gridColumn: '1 / -1', fontSize: 2 }}>Options</h2>

          <label>
            Vertical
            <input
              checked={options.vertical}
              name="vertical"
              onChange={changeOptions}
              sx={{ ml: 2 }}
              type="checkbox"
            />
          </label>
          <label>
            Loop
            <input
              checked={options.loop}
              name="loop"
              onChange={changeOptions}
              sx={{ ml: 2 }}
              type="checkbox"
            />
          </label>
          <label>
            Smooth
            <input
              checked={options.smooth}
              name="smooth"
              onChange={changeOptions}
              sx={{ ml: 2 }}
              type="checkbox"
            />
          </label>

          <label sx={{ display: 'flex' }}>
            Start from
            <input
              max={slides.length - 1}
              min="0"
              onChange={e => setInitialSlide(e.currentTarget.value)}
              sx={{ ml: 2 }}
              type="number"
              value={initialSlide}
            />
          </label>

          <h2 sx={{ gridColumn: '1 / -1', fontSize: 2 }}>Controls</h2>

          <h3 sx={{ fontSize: 1 }}>Dots:</h3>

          <label>
            Touch
            <input
              checked={controls.dots === 'touch'}
              name="dots"
              onChange={changeControls}
              sx={{ ml: 2 }}
              type="radio"
              value="touch"
            />
          </label>
          <label>
            Desktop
            <input
              checked={controls.dots === 'desktop'}
              name="dots"
              onChange={changeControls}
              sx={{ ml: 2 }}
              type="radio"
              value="desktop"
            />
          </label>
          <label>
            Both
            <input
              checked={controls.dots === 'both'}
              name="dots"
              onChange={changeControls}
              sx={{ ml: 2 }}
              type="radio"
              value="both"
            />
          </label>

          <h3 sx={{ fontSize: 1 }}>Arrows:</h3>

          <label>
            Touch
            <input
              checked={controls.arrows === 'touch'}
              name="arrows"
              onChange={changeControls}
              sx={{ ml: 2 }}
              type="radio"
              value="touch"
            />
          </label>
          <label>
            Desktop
            <input
              checked={controls.arrows === 'desktop'}
              name="arrows"
              onChange={changeControls}
              sx={{ ml: 2 }}
              type="radio"
              value="desktop"
            />
          </label>
          <label>
            Both
            <input
              checked={controls.arrows === 'both'}
              name="arrows"
              onChange={changeControls}
              sx={{ ml: 2 }}
              type="radio"
              value="both"
            />
          </label>
        </div>
      </section>
    </main>
  );
}

export default App;
