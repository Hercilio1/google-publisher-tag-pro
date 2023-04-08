import { googletag } from "./adsGlobals";

export const defineLazyLoad = () => {
  googletag.pubads().enableLazyLoad({
    // Fetch slots within 5 viewports.
    fetchMarginPercent: 100,
    // Render slots within 2 viewports.
    renderMarginPercent: 100,
    // Double the above values on mobile, where viewports are smaller
    // and users tend to scroll faster.
    mobileScaling: 1.0,
  });
};

export default defineLazyLoad;
