import { blocks, googletag } from "./adsGlobals";

const displayAd = (block) => {
  googletag.cmd.push(() => googletag.display(block.id));
  block.displayed = true;
};

/**
 * Pass through the blocks object and display the ads that aren't display yet.
 */
export const displayAdsBlocks = () => {
  for (const index in blocks) {
    if (blocks[index]) {
      const block = blocks[index];
      if (block.displayed || block.error) {
        continue;
      }
      if ("any" === block.agent) {
        displayAd(block);
      } else if ("mobile" === block.agent && screen.width < 992) {
        displayAd(block);
      } else if ("desktop" === block.agent && screen.width >= 992) {
        displayAd(block);
      }
    }
  }
};

export default displayAdsBlocks;
