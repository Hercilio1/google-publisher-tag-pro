/* global googletag */

import loadAdsBlocks from "./adsLoader";

window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(loadAdsBlocks(googletag));
