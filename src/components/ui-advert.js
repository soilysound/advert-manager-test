import { loadGPT } from "./load-gpt";
import { getCovatic } from "./get-covatic";
import { getPeer39 } from "./get-peer-39";
import { globalSetUp } from "./global-setup";
import { createSlot } from "./create-slot";
import { createSlots } from "./create-slots";
import { renderAds } from "./render-ads";

export default function (rootElement) {
  if (!rootElement) {
    return;
  }

  const config = {
    targeting: {},
    slots: [],
  }

  const slotDefaults = {
    tag: '',
    sizes: JSON.stringify("[[300, 250]]"),
    format: 'mpu',
    id: 'mpu-1',
    targeting: JSON.stringify({ "platform": "test" })
  };

  loadGPT()
    .then(() => getCovatic(config))
    .then(() => getPeer39(config))
    .then(() => globalSetUp(config))
    .then(() => createSlots(config, slotDefaults))
    .then(() => renderAds(config));

  // try adding an advert after load
  // use a css animation event or mutation observer to grab new adverts added after load
  setTimeout(() => {
    const lazySlot = document.querySelector('.ui-advert').cloneNode();
    lazySlot.dataset.id = 'advert-3';
    lazySlot.id = 'advert-3';
    config.slots.push(createSlot(lazySlot, slotDefaults));
    document.body.appendChild(lazySlot);
    renderAds(config);
  }, 2000)
}
