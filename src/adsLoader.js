import adsSizes from "./adsSizes";
import {
	CLIENT_DEFAULT_ID,
	REFRESH_KEY,
	REFRESH_VALUE
} from "./adsSettings";

/**
 * Define a slot based on the sent params
 *
 * @param {string}  id       Block div id.
 * @param {Array}   sizes    Slot enabled sizes.
 * @param {string}  clientIdSuffix   Ad manager client id suffix. Default is ''.
 * @param {string}  agent    'desktop' or 'mobile' or both ('any'). Default is 'any'.
 * @param {boolean} refresh  Refresh ads or not. Default is false.
 * @param {string}  clientIdPrefix A custom clientIdPrefix. Default is null.
 */
export const loadAdBlock = (
  id,
  sizes,
  clientIdSuffix = '',
  agent = "any",
  refresh = false,
  clientIdPrefix = null
) => {
  if (!id || !sizes || !clientIdSuffix) {
    return;
  }

  if (!clientIdPrefix) {
    clientId = CLIENT_DEFAULT_ID + clientIdSuffix;
  } else {
    clientId = clientIdPrefix + clientIdSuffix;
  }

  const currentSlot = googletag.defineSlot(
    clientId,
    adsSizes[sizes].sizes,
    id
  );

  if (currentSlot) {
    if (refresh) {
      currentSlot.setTargeting(REFRESH_KEY, REFRESH_VALUE);
    }

    currentSlot.addService(googletag.pubads());

    return {
      id,
      agent,
      slot: currentSlot,
    };
  } 
  
  throw new Error(`Ad ${id} not found`);
};

export default loadAdBlock;