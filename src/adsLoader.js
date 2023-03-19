import {
	CLIENT_DEFAULT_ID,
	REFRESH_KEY,
	REFRESH_VALUE,
	ADS_SELECTOR,
} from "./adsSettings";
import adsSizes from "./adsSizes";
import defineLazyLoad from "./adsLazyload";
import defineRefresh from "./adsRefresh";

export const loadAdsBlocks = (googletag) => () => {
	/**
	 * @constant {Array} blocks Contém os blocos a serem carregados na página atual.
	 */
	const blocks = [];

	/**
	 * @constant {Object} displayedAds Armazena os ads que já foram exibidos.
	 */
	const displayedAds = {};

	/**
	 * Define um slot seguindo um padrão bem específico.
	 *
	 * @param {string}  id       Id do bloco.
	 * @param {string}  adUnit   Ad unit que define o adLoader.
	 * @param {Array}   sizes    Lista de tamanhos.
	 * @param {string}  agent    'desktop' ou 'mobile'. Default is 'any'.
	 * @param {boolean} refresh  Fazer refresh ou não. Default is false.
	 * @param {string}  adLoader Alguma Path de identificação diferente para o Ad. Default is null.
	 */
	const loadAdBlock = (
		id,
		adUnit,
		sizes,
		agent = "any",
		refresh = false,
		adLoader = null
	) => {
		if (!id || !sizes || !adUnit) {
			return;
		}

		if (!adLoader) {
			adLoader = CLIENT_DEFAULT_ID + adUnit;
		}

		const currentSlot = googletag.defineSlot(
			adLoader,
			adsSizes[sizes].sizes,
			id
		);

		if (currentSlot) {
			if (refresh) {
				currentSlot.setTargeting(REFRESH_KEY, REFRESH_VALUE);
			}

			currentSlot.addService(googletag.pubads());

			blocks.push({
				id,
				agent,
				slot: currentSlot,
			});
		} else {
			// eslint-disable-next-line no-console
			console.info("Slot não encontrado: " + id);
		}
	};

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
				const adUnit = currentAd.getAttribute("ad-unit");
				const sizes = currentAd.getAttribute("sizes");
				const agent = currentAd.getAttribute("agent") ?? "any";
				const refresh = currentAd.getAttribute("refresh") ?? false;
				const adLoader = currentAd.getAttribute("ad-loader") ?? null;
				loadAdBlock(id, adUnit, sizes, agent, refresh, adLoader);
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

	defineLazyLoad(googletag);
	defineRefresh(googletag);

	googletag.enableServices();

	window.publishersLoadAndDisplayAds = () => {
		findAds();
		displayAds();
	};

	window.publishersLoadAndDisplayAds();
};

export default loadAdsBlocks;
