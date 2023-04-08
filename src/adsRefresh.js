import { googletag } from "./adsGlobals";
import {
  REFRESH_KEY,
  REFRESH_VALUE,
  SECONDS_TO_WAIT_AFTER_VIEWABILITY,
} from "./adsSettings";

export const defineRefresh = () => {
  googletag.pubads().addEventListener("impressionViewable", function (event) {
    const slot = event.slot;
    if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
      setTimeout(function () {
        googletag.pubads().refresh([slot]);
      }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
    }
  });
};
export default defineRefresh;
