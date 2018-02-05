// to remove the error in React 16:
// Warning: React depends on requestAnimationFrame.
// Make sure that you load a polyfill in older browsers.
interface global extends NodeJS.Global {
  requestAnimationFrame: any;
}

const raf = ((global as global).requestAnimationFrame = (
  cb: FrameRequestCallback
) => {
  setTimeout(cb, 0);
});

export default raf;
