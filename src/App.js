/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState } from "react";
import Carousel from "./components/Carousel";
import slides from "./slides.json";

function App() {
  const [vertical, setVertical] = useState(false);
  const [loop, setLoop] = useState(false);
  const [smooth, setSmooth] = useState(true);
  const [slideGap, setSlideGap] = useState(0);
  const [initialSlide, setInitialSlide] = useState(0);

  return (
    <div style={{ minHeight: 400, height: "40vw", maxHeight: 700 }}>
      <Carousel
        vertical={vertical}
        loopAround={loop}
        slideGap={slideGap}
        smooth={smooth}
        initialSlide={initialSlide}
      >
        {slides.map(slide => (
          <img
            sx={{ size: "100%", objectFit: "cover" }}
            src={slide.src}
            alt={slide.alt}
          />
        ))}
      </Carousel>

      <section sx={{ padding: 4, margin: "auto", maxWidth: 500 }}>
        <h1 sx={{ fontSize: 3 }}>Carousel Demo</h1>
        <p>
          Modern carousel based on CSS snapping points, Grid, Intersection
          Observer & scrollIntoView. Fully responsive: no absolute positioning,
          will always be as big as its parent. Native scrolling behavior. No
          scroll hijacking.
        </p>
        <h2 sx={{ fontSize: 2 }}>Props</h2>
        <button onClick={() => setVertical(val => !val)}>
          {vertical ? "Horizontal" : "Vertical"}
        </button>
        <button onClick={() => setLoop(val => !val)}>
          {loop ? "Don't loop" : "Loop"}
        </button>
        <button onClick={() => setSmooth(val => !val)}>
          {smooth ? "Instant transition" : "Smooth transition"}
        </button>
        <br />
        <label sx={{ display: "flex", marginY: 2 }}>
          <input
            sx={{ marginRight: 2 }}
            type="text"
            value={slideGap}
            onChange={e => setSlideGap(e.currentTarget.value)}
          />
          gap (%, px)
        </label>
        <label sx={{ display: "flex", marginY: 2 }}>
          <input
            sx={{ marginRight: 2 }}
            type="number"
            value={initialSlide}
            min="0"
            max={slides.length - 1}
            onChange={e => setInitialSlide(e.currentTarget.value)}
          />
          starting point
        </label>
      </section>
    </div>
  );
}

export default App;
