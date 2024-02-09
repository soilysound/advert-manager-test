import overload from "../utils/overload";
import renderAds from "../utils/renderAds";

export default function (rootElement) {
  if (!rootElement) {
    return;
  }

  if (rootElement.dataset.manager) {
    initManager(rootElement);
    return;
  }

  // Currently not used
  initSlot(rootElement);
}

function initManager() {  
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
    return new Promise((resolve, reject) => {
      console.log('Load GPT');
      const script = document.createElement('script');
      script.onload = resolve;
      document.head.appendChild(script);
      script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    });
  }

  function getPeer39() {
    return new Promise((resolve, reject) => {
      console.log('Load Peer39');
      // check CMP, load peer39 and get data here
      config.props.push('whatever-from-peer39');
      resolve();
    });
  }

  function getCovatic() {
    return new Promise((resolve, reject) => {
      console.log('Load Covatic');
      // check CMP, load covatic and get data here
      config.props.push('whatever-from-covatic');
      resolve();
    });
  }

  loadGPT()
    .then(() => getCovatic())
    .then(() => getPeer39())
    .then(() => overload(config))
}

function initSlot(rootElement) {
  console.log('Execute initSlot - simulate component calling init()')
  const slotDefaults = {
    prop1: 1,
    prop2: 2,
    prop3: 3
  };

  if (!window.adSlots) {
    window.adSlots = new Array();
  }

  const slotConfig = Object.assign({}, slotDefaults);

  // Override default slot data with data from html
  // NOTE - this prob needs to be a deep merge
  Object.assign(slotConfig, JSON.parse(rootElement.dataset.config));

  slotConfig.rootElement = rootElement;
  slotConfig.slotType = rootElement.dataset.slotType;
  slotConfig.id = 'advert-2';

  window.adSlots.push(slotConfig)
}

window.addDumbSlotAfterWait = function() {
  let div = document.querySelector('.advert-slot').cloneNode();
  div.classList.add('cloned')
  document.querySelector('.page-wrapper').appendChild(div)
  div.dataset.tag = '12345/cloned'

  // Simulate initSlot execution, will be done in the component loader
  initSlot(div);
}

// Simulate ad loading after manager is initialised
setTimeout(() => {
  window.addDumbSlotAfterWait()
}, 5000);