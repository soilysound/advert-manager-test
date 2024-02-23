export default function (rootElement) {
  if (!rootElement) {
    return;
  }

  const config = {
    targeting: [],
    slots: []
  }

  const slotDefaults = {
    tag: '',
    sizes: JSON.stringify("[[300, 250]]"),
    format: 'mpu',
    id: 'mpu-1',
    targeting: JSON.stringify({"platform": "test"})
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
      config.targeting.p39_sky = 'whatever-from-peer39';
      resolve();
    });
  }

  function getCovatic() {
    console.log('load Covatic');
    return new Promise((resolve, reject) => {
      // check CMP, load covatic and get data here
      config.targeting.covatic_sky = 'whatever-from-covatic';
      resolve();
    });

  }

  function globalSetUp() {
    console.log('global setup', config);
    return new Promise((resolve) => {
      Object.entries(config.targeting).forEach(([key, value]) => {
        googletag.cmd.push(() => {  
          googletag.pubads().setTargeting(key, value);
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        });
      });

      resolve();
    })
  }

  function createSlot(slot) {
    console.log('create slot');
    // merge the slot dataset into the defaults
    const slotConfig = Object.assign(Object.assign({}, slotDefaults), slot.dataset);
    slotConfig.rootElement = slot;
    slotConfig.targeting = JSON.parse(slotConfig.targeting);
    slotConfig.sizes = JSON.parse(slotConfig.sizes);

    config.slots.push(slotConfig);
  }
  
  function createSlots() {
    console.log('create slots');
    return new Promise((resolve, reject) => {
      // get slots from page
      Array.from(document.querySelectorAll('.advert')).forEach(slot => createSlot(slot));
      resolve();
    });

  }

  function renderAds() {
    console.log('render ads');
    // loop through each slot and render (but ignore slots that have already being rendered)
    config.slots.filter((slot) => !slot.rendered).forEach((slot) => {
      slot.rendered = true;
      googletag.cmd.push(() => {
        // create advert
        const adSlot = googletag.defineSlot(
          slot.tag, 
          slot.sizes, 
          slot.id)
        .addService(googletag.pubads());

        // set targeting
        Object.entries(slot.targeting).forEach(([key, value]) => {
          adSlot.setTargeting(key, value);
        });
          
        googletag.display(slot.id);
      });
    });
  }

  loadGPT()
    .then(() => getCovatic())
    .then(() => getPeer39())
    .then(() => globalSetUp())
    .then(() => createSlots())
    .then(() => renderAds());

  // try adding an advert after load
  setTimeout(() => {
    const lazySlot = document.querySelector('.advert').cloneNode();
    lazySlot.dataset.id = 'advert-3';
    lazySlot.id = 'advert-3';
    createSlot(lazySlot);
    document.body.appendChild(lazySlot);
    renderAds();
  }, 2000)
}
