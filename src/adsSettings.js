const gptProSettings = window.gptProSettings;

export const CLIENT_DEFAULT_ID =
  gptProSettings?.CLIENT_DEFAULT_ID ?? "/6355419/";
export const REFRESH_KEY = gptProSettings?.REFRESH_KEY ?? "refresh";
export const REFRESH_VALUE = gptProSettings?.REFRESH_VALUE ?? "true";
export const SECONDS_TO_WAIT_AFTER_VIEWABILITY =
  gptProSettings?.SECONDS_TO_WAIT_AFTER_VIEWABILITY ?? 30;
export const ADS_SELECTOR =
  gptProSettings?.ADS_SELECTOR ?? ".ad-gpt-pro .ad-gpt-pro-slot";
