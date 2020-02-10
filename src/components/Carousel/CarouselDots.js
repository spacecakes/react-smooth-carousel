/** @jsx jsx */
import { array, bool, func, number } from "prop-types";
import { jsx } from "theme-ui";

const CarouselDots = ({
  handleClick,
  vertical,
  slideIndexes,
  currentSlide
}) => {
  return (
    <div
      sx={{
        gridArea: "dots",
        display: "flex",
        flexDirection: vertical ? "column" : null,
        zIndex: 1,
        padding: 2,
        placeSelf: "center",
        mixBlendMode: "screen"
      }}
    >
      {slideIndexes.map(slide => {
        const disabled = slide === currentSlide;
        return (
          <button
            disabled={disabled}
            key={slide}
            onClick={() => handleClick(slide)}
            sx={{
              background: disabled ? "white" : "none",
              color: disabled ? "black" : "white",
              mixBlendMode: "screen",
              userSelect: "none",
              size: 40,
              border: 0,
              padding: 0,
              opacity: 0.7,
              outline: "none",
              fontWeight: "bold",
              fontSize: disabled ? 3 : 2,
              borderRadius: "50%",
              transition: "all 0.2s",
              "@media (pointer: fine)": {
                ":hover": {
                  opacity: disabled ? null : 0.9,
                  fontSize: 3
                }
              }
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
  slideIndexes: array.isRequired,
  vertical: bool.isRequired
};

export default CarouselDots;
