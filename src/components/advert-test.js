export default function (rootElement) {
  if (!rootElement) {
    return;
  }

  const config = {
    props: [],
    slots: []
  }

  function loadGPT(){
    console.log('load GPT');
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = resolve;
      document.head.appendChild(script);
      script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    });
  }

  function getPeer39(){
    console.log('load Peer39');
    return new Promise((resolve, reject) => {
      // check CMP, load peer39 and get data here
      config.props.push('whatever-from-peer39');
      resolve();
    });
  }

  function getCovatic(){
    console.log('load Covatic');
    return new Promise((resolve, reject) => {
      // check CMP, load covatic and get data here
      config.props.push('whatever-from-covatic');
      resolve();
    });
   
  }

  function init(){
    // get slots from page
    config.slots = Array.from(document.querySelectorAll('.advert-slot')).map((slot) => {
      const data = JSON.parse(slot.dataset.config);
      data.rootElement = slot;
      data.slotType = slot.dataset.slotType;
      return data;
    });

    console.log(config);
  }

  loadGPT()
    .then(() => getCovatic())
    .then(() => getPeer39())
    .then(() => init())
}
