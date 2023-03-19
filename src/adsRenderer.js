import { ADS_SELECTOR } from "./adsSettings";
import loadAdBlock from "./adsLoader";
import defineLazyLoad from "./adsLazyload";
import defineRefresh from "./adsRefresh";

export const renderAdBlocks = (googletag) => () => {
	/**
	 * @constant {Array} blocks store the ads to be loaded in the current page.
	 */
	const blocks = [];

	/**
	 * @constant {Object} displayedAds store the ads that are already displayed.
	 */
	const displayedAds = {};

	/**
	 * Search for ads and add them to the blocks array.
	 */
	const findAds = () => {
		const blocksSet = new Set();
		blocks.forEach((block) => blocksSet.add(block.id));
		const ads = document.querySelectorAll(ADS_SELECTOR);
		if (ads.length > 0) {
			ads.forEach((currentAd) => {
				if (blocksSet.has(currentAd.id)) {
					return;
				}
				const id = currentAd.id;
				const sizes = currentAd.getAttribute("ad-sizes");
				const clientIdSuffix = currentAd.getAttribute("ad-client-id-suffix") ?? '';
				const agent = currentAd.getAttribute("ad-agent") ?? "any";
				const refresh = currentAd.getAttribute("ad-refresh") ?? false;
				const clientIdPrefix = currentAd.getAttribute("ad-client-id-prefix") ?? null;
				try {
					const addBlock = loadAdBlock(id, sizes, clientIdSuffix, agent, refresh, clientIdPrefix);
					blocks.push(addBlock);
				} catch(err) {
					console.warn(err.message);
				}
			});
		}
	};

	/**
	 * Pass through the blocks array and display the ads that aren't display yet.
	 */
	const displayAds = () => {
		if (blocks.length > 0) {
			blocks.forEach((block) => {
				if (displayedAds?.[block.id]) {
					return;
				}
				if ("any" === block.agent) {
					googletag.display(block.slot);
					displayedAds[block.id] = true;
				} else if ("mobile" === block.agent && screen.width < 992) {
					googletag.display(block.slot);
					displayedAds[block.id] = true;
				} else if ("desktop" === block.agent && screen.width >= 992) {
					googletag.display(block.slot);
					displayedAds[block.id] = true;
				}
			});
		}
	};

	/**
	 * Find and render all ads that aren't rendered yet.
	 */
	window.gptProRenderAds = () => {
		findAds();
		displayAds();
	};

	defineLazyLoad(googletag);
	defineRefresh(googletag);

	googletag.enableServices();
	window.gptProRenderAds();
};

export default loadAdsBlocks;
