$("#slides").slidesjs({
  width: 1280,
  height: 600,
  play: {
    active: false,
    // [boolean] Generate the play and stop buttons.
    // You cannot use your own buttons. Sorry.
    effect: "slide",
    // [string] Can be either "slide" or "fade".
    interval: 7000,
    // [number] Time spent on each slide in milliseconds.
    auto: true,
    // [boolean] Start playing the slideshow on load.
    swap: false,
    // [boolean] show/hide stop and play buttons
    pauseOnHover: false,
    // [boolean] pause a playing slideshow on hover
    restartDelay: 100
    // [number] restart delay on inactive slideshow
  },
  effect: {
    slide: {
      speed: 2000
    }
  }
});
