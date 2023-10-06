import { ADS_SELECTOR } from "./adsSettings";
import { blocks } from "./adsGlobals";

export const findAdsSlots = () => {
  const ads = document.querySelectorAll(ADS_SELECTOR);
  if (ads.length > 0) {
    ads.forEach((currentAd) => {
      const id = currentAd.id;
      if (blocks[id]?.loaded) {
        return;
      }

      const sizes = currentAd.getAttribute("ad-sizes");
      const customSizes =
        JSON.parse(currentAd.getAttribute("ad-custom-sizes")) ?? null;
      const clientIdSuffix =
        currentAd.getAttribute("ad-client-id-suffix") ?? "";
      const agent = currentAd.getAttribute("ad-agent") ?? "any";
      const refresh = currentAd.getAttribute("ad-refresh") ?? false;
      const clientIdPrefix =
        currentAd.getAttribute("ad-client-id-prefix") ?? null;

      const targets = {
          'ad-page-id': currentAd.getAttribute("ad-page-id") ?? null,
          'ad-page-slug': currentAd.getAttribute("ad-page-slug") ?? null,
          'ad-post-id': currentAd.getAttribute("ad-post-id") ?? null,
          'ad-post-tag': currentAd.getAttribute("ad-post-tag") ?? null,
          'ad-primary-category': currentAd.getAttribute("ad-primary-category") ?? null,
          'ad-category': currentAd.getAttribute("ad-category") ?? null,
          'ad-term-id': currentAd.getAttribute("ad-term-id") ?? null,
          'ad-page-type': currentAd.getAttribute("ad-page-type") ?? null
      };

      blocks[id] = {
        id,
        sizes,
        customSizes,
        clientIdSuffix,
        agent,
        refresh,
        clientIdPrefix,
        targets
      };
    });
  }
};

export default findAdsSlots;
