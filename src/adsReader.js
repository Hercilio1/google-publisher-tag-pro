import { ADS_SELECTOR } from "./adsSettings";
import { blocks } from "./adsGlobals";

export const findAdsSlots = () => {
  const ads = document.querySelectorAll(ADS_SELECTOR);
  if (ads.length > 0) {
    ads.forEach((currentAd) => {
      const id = currentAd.id;
      const sizes = currentAd.getAttribute("ad-sizes");
      const clientIdSuffix =
        currentAd.getAttribute("ad-client-id-suffix") ?? "";
      const agent = currentAd.getAttribute("ad-agent") ?? "any";
      const refresh = currentAd.getAttribute("ad-refresh") ?? false;
      const clientIdPrefix =
        currentAd.getAttribute("ad-client-id-prefix") ?? null;
      blocks[id] = {
        id,
        sizes,
        clientIdSuffix,
        agent,
        refresh,
        clientIdPrefix,
      };
    });
  }
};

export default findAdsSlots;
