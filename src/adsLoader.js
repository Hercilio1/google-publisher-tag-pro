import { CLIENT_DEFAULT_ID, REFRESH_KEY, REFRESH_VALUE } from "./adsSettings";
import { googletag, blocks } from "./adsGlobals";
import adsSizes from "./adsSizes";
import defineLazyLoad from "./adsLazyload";
import defineRefresh from "./adsRefresh";

/**
 * Define a slot based on the sent params
 *
 * @param {string}  id       Block div id.
 * @param {Array}   sizes    Slot enabled sizes.
 * @param {string}  clientIdSuffix   Ad manager client id suffix. Default is ''.
 * @param {boolean} refresh  Refresh ads or not. Default is false.
 * @param {string}  clientIdPrefix A custom clientIdPrefix. Default is null.
 *
 * @throws {Error} If the slot is not found or it is badly defined.
 */
const defineAdSlot = (
  id,
  sizes,
  clientIdSuffix = "",
  refresh = false,
  clientIdPrefix = null
) => {
  if (!id || !sizes || !clientIdSuffix) {
    throw new Error(`Invalid ad block ${id} - ${sizes} - ${clientIdSuffix}`);
  }

  let clientId = CLIENT_DEFAULT_ID + clientIdSuffix;

  if (clientIdPrefix) {
    clientId = clientIdPrefix + clientIdSuffix;
  }

  const currentSlot = googletag.defineSlot(clientId, adsSizes[sizes].sizes, id);

  if (currentSlot) {
    if (refresh) {
      currentSlot.setTargeting(REFRESH_KEY, REFRESH_VALUE);
    }
    currentSlot.addService(googletag.pubads());
  } else {
    throw new Error(`Ad ${id} not found`);
  }
};

/**
 * Iterate through the blocks and define them.
 */
const defineAdsBlocks = () => {
  for (const index in blocks) {
    if (blocks[index] && !blocks[index].loaded && !blocks[index].error) {
      try {
        defineAdSlot(
          blocks[index].id,
          blocks[index].sizes,
          blocks[index].clientIdSuffix,
          blocks[index].refresh,
          blocks[index].clientIdPrefix
        );
        blocks[index].loaded = true;
      } catch (error) {
        blocks[index].error = error;
        console.warn(error.message);
      }
    }
  }
};

/**
 * Load the ads and define its structure.
 */
export const loadAdsBlocks = () => {
  googletag.cmd.push(() => {
    defineAdsBlocks();
    defineLazyLoad();
    defineRefresh();
    googletag.enableServices();
  });
};

export default loadAdsBlocks;
