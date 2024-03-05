import { loadGPT } from "./load-gpt";
import { getCovatic } from "./get-covatic";
import { getPeer39 } from "./get-peer-39";
import { globalSetUp } from "./global-setup";
import { createSlots } from "./create-slots";
import { renderAds, renderAdsAfterLoad, renderAdsOnViewPortChange } from "./render-ads";

export default function (rootElement) {
  if (!rootElement) {
    return;
  }

  const config = {
    rootElement,
    targeting: {},
    slots: [],
    responsiveSlots: [],
    breakpoints: {
      "mobile": { w: 320, mq: "(min-width: 0px) and (max-width: 740px)" },
      "tablet": { w: 740, mq: "(min-width: 740px) and (max-width: 1000px)" },
      "desktop": { w: 1000, mq: "(min-width: 1000px)" },
      "default": { w: 0 }
    }
  }

  const slotDefaults = {
    tag: '',
    size: JSON.stringify("{\"mobile\":[[300,250],[300,600]]}"),
    format: 'mpu',
    id: 'mpu-1',
    targeting: JSON.stringify({ "platform": "test" })
  };

  loadGPT()
    .then(() => getCovatic(config))
    .then(() => getPeer39(config))
    .then(() => globalSetUp(config))
    .then(() => createSlots(config, slotDefaults))
    .then(() => renderAds(config))
    .then(() => renderAdsOnViewPortChange(config, slotDefaults))
    .then(() => renderAdsAfterLoad(config, slotDefaults));
}
