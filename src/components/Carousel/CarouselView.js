/** @jsx jsx */
import { bool, node, number } from "prop-types";
import { jsx } from "theme-ui";

const CarouselView = ({ children, vertical, slidesVisible, slideGap }) => {
  return (
    <div
      sx={{
        gridArea: "1 / 1 / -1 / -1",
        gridGap: slideGap,
        display: "grid",
        gridAutoFlow: vertical ? "row" : "column",
        gridAutoColumns: vertical ? "100%" : `${100 / slidesVisible}%`,
        gridAutoRows: vertical ? `${100 / slidesVisible}%` : "100%",
        size: "100%",
        outline: "none",
        overflowY: vertical ? "auto" : "hidden",
        overflowX: vertical ? "hidden" : "auto",
        scrollSnapType: `${vertical ? "y" : "x"} mandatory`,
        scrollbarWidth: "none", // Hide scrollbar on Firefox
        "-webkit-overflow-scrolling": "touch", // Needed to work on iOS Safari
        "::-webkit-scrollbar": { display: "none" } // Hide scrollbar on Chrome & Safari
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
  vertical: bool.isRequired
};

export default CarouselView;
