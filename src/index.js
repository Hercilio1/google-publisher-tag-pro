import findAdsSlots from "./adsReader";
import loadAdsBlocks from "./adsLoader";
import displayAdsBlocks from "./adsRenderer";

window.gptProDisplayAds = () => {
  findAdsSlots();
  loadAdsBlocks();
  displayAdsBlocks();
};

window.gptProDisplayAds();
