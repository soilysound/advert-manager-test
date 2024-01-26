export default function (rootElement) {
  if (!rootElement) {
    return;
  }

  const config = {
    props: [],
    slots: []
  }

  const slotDefaults = {
    prop1: 1,
    prop2: 2,
    prop3: 3
  };

  function loadGPT() {
    console.log('load GPT');
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = resolve;
      document.head.appendChild(script);
      script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    });
  }

  function getPeer39() {
    console.log('load Peer39');
    return new Promise((resolve, reject) => {
      // check CMP, load peer39 and get data here
      config.props.push('whatever-from-peer39');
      resolve();
    });
  }

  function getCovatic() {
    console.log('load Covatic');
    return new Promise((resolve, reject) => {
      // check CMP, load covatic and get data here
      config.props.push('whatever-from-covatic');
      resolve();
    });

  }

  function initSlots() {
    return new Promise((resolve, reject) => {
      // get slots from page
      config.slots = Array.from(document.querySelectorAll('.advert-slot')).map((slot) => {
        const slotConfig = Object.assign({}, slotDefaults);

        // Override default slot data with data from html
        // NOTE - this prob needs to be a deep merge
        Object.assign(slotConfig, JSON.parse(slot.dataset.config));

        slotConfig.rootElement = slot;
        slotConfig.slotType = slot.dataset.slotType;

        return slotConfig;
      });

      resolve();
    });

  }

  function renderAds() {
    // call google render ads function here
    console.log('render ads here', config);
  }

  loadGPT()
    .then(() => getCovatic())
    .then(() => getPeer39())
    .then(() => initSlots())
    .then(() => renderAds())
}
