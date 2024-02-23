export default function (rootElement) {
  if (!rootElement) {
    return;
  }

  const config = {
    props: [],
    slots: []
  }

  const slotDefaults = {
    slotTag: '',
    slotType: 'mpu',
    id: 'mpu-1'
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
      config.props.p39_sky = 'whatever-from-peer39';
      resolve();
    });
  }

  function getCovatic() {
    console.log('load Covatic');
    return new Promise((resolve, reject) => {
      // check CMP, load covatic and get data here
      config.props.covatic_sky = 'whatever-from-covatic';
      resolve();
    });

  }

  function globalSetUp() {
    console.log('global setup', config);
    return new Promise((resolve) => {
      Object.entries(config.props).forEach(([key, value]) => {
        googletag.cmd.push(() => {  googletag.pubads().setTargeting(key, value) });
      });

      resolve();
    })
  }

  function createSlot(slot) {
    console.log('create slot');
    // merge the slot dataset into the defaults
    const slotConfig = Object.assign(Object.assign({}, slotDefaults), slot.dataset);
    
    slotConfig.rootElement = slot;
    config.slots.push(slotConfig);
  }
  
  function createSlots() {
    console.log('create slots');
    return new Promise((resolve, reject) => {
      // get slots from page
      Array.from(document.querySelectorAll('.advert-slot')).forEach(slot => createSlot(slot));
      resolve();
    });

  }

  function renderAds() {
    console.log('render ads');
    // loop through each slot and render
    config.slots.filter((slot) => !slot.rendered).forEach((slot) => {
      slot.rendered = true;
      googletag.cmd.push(() => {
        slot.rootElement.innerHTML = '';
        googletag.pubads().enableSingleRequest();
        googletag.defineSlot(slot.slotTag, [300, 250], slot.id).addService(googletag.pubads());
        googletag.display(slot.id);
        googletag.enableServices();
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
    const lazySlot = document.querySelector('.advert-slot').cloneNode();
    lazySlot.dataset.id = 'advert-3';
    lazySlot.id = 'advert-3';
    createSlot(lazySlot);
    document.body.appendChild(lazySlot);
    renderAds();
  }, 3000)
}
