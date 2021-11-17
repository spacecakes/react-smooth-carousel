# React Smooth Carousel

Modern carousel based on CSS snapping points, Grid, Intersection
Observer & `scrollIntoView()`. Fully responsive, and native scrolling behavior
without hijacking.

## Why

Oh lord, another carousel?

Yes. This one aims to provide:

1. **Native UX.** Most carousel/slideshow components use JavaScript to scroll, which make them feel out of place and often jerky. This implementation uses CSS and browser APIs to scroll the container, meaning it behaves exactly like you expect it to on your platform of choice.

2. **Responsiveness.** Other carousels also tend to use `position: absolute;` to position contents, which takes it out of flow and gets in the way of responsiveness. This usually means they require fixed-size content with absolute values (like `px`) and that they don't respond well to viewport changes. By contrast, this implementation will always be as big as its containing element. _You_ control the size by adapting your layout.

## Demo

Try it out [here](https://react-smooth-carousel.netlify.app).

[![Netlify Status](https://api.netlify.com/api/v1/badges/c63a653a-6521-4e1c-b3da-36e741f40463/deploy-status)](https://app.netlify.com/sites/react-smooth-carousel/deploys)

## Props

Todo: list valid options here

## Usage

Stick whatever element you like as children and `react-smooth-carousel` will render them. The carousel will always take up 100% of its containing element, so make sure to give the container a `min-block-size`. For best results with images, size them to `100%` and set them to `object-fit: cover;`.

## Known issues

- Doesn't snap properly to start or end in Chrome when `loop` is off
- Viewing more than one slide at once is currently not supported
