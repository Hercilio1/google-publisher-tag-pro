import { ADS_SELECTOR } from "./adsSettings";
import loadAdBlock from "./adsLoader";
import defineLazyLoad from "./adsLazyload";
import defineRefresh from "./adsRefresh";

/**
 * @constant {Set} displayedAds store the ads that are already displayed.
 */
const displayedAds = new Set();

// TODO: load blocks.


/**
 * Pass through the blocks array and display the ads that aren't display yet.
 */
export const displayAdBlocks = (googletag) => () => {

	const displayAd = (block) => {
		googletag.cmd.push(() => googletag.display(block.id));
		displayedAds.add(block.id);
	};
	
	if (blocks.length > 0) {
		blocks.forEach((block) => {
			if (displayedAds.has(block.id)) {
				return;
			}
			if ("any" === block.agent) {
				displayAd(block);
			} else if ("mobile" === block.agent && screen.width < 992) {
				displayAd(block);
			} else if ("desktop" === block.agent && screen.width >= 992) {
				displayAd(block);
			}
		});
	}
};

export default loadAdsBlocks;
