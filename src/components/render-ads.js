import { createSlot } from "./create-slot";

export function getSizeMapping(sizes, config) {
  const sizeMappings = [];

  for (const item in sizes) {
    if (item !== 'default') {
      sizeMappings.unshift([[config.breakpoints[item].w, 0], sizes[item]]);
    }
  }

  return sizeMappings;
}

export function renderAds(config) {
  console.log('render ads');
  return new Promise((resolve) => {
    // loop through each slot and render (but ignore slots that have already being rendered)
    config.slots.filter((slot) => !slot.rendered).forEach((slot) => {
      slot.rendered = true;

      googletag.cmd.push(() => {
        // create advert
        const adSlot = googletag.defineSlot(
          slot.tag,
          slot.sizes.mobile,
          slot.id)
          .addService(googletag.pubads());

        // set size mapping
        const mapping = getSizeMapping(slot.sizes, config);
        adSlot.defineSizeMapping(mapping);
 
        // set targeting
        Object.entries(slot.targeting).forEach(([key, value]) => {
          adSlot.setTargeting(key, value);
        });

        // @TODO - filter out ads we dont want to be responsive?
        config.responsiveSlots[slot.id] = adSlot;

        // display advert
        googletag.display(slot.id);
      });
    });

    resolve();
  });

}

export function renderAdsAfterLoad(config, slotDefaults) {

  // use unobstrusive animation to capture when a new '.ui-advert' element is added to the DOM
  config.rootElement.insertAdjacentHTML('afterbegin', `<style>@keyframes ui-advert {from {outline-width:0.1em} to {outline-width:0}}.ui-advert{animation: ui-advert 0.1s}</style>`);

  document.addEventListener('animationstart', function (event) {
    if (event.animationName === 'ui-advert') {
      const advert = event.target;

      // make sure theres no advert already in our slots array with the same id
      if (config.slots.find(item => item.id === advert.id)) {
        return;
      }

      config.slots.push(createSlot(advert, slotDefaults));
      renderAds(config);
    }
  });
}

export function renderAdsOnViewPortChange(config) {
  return new Promise((resolve) => {
    resolve();
  });

  // @TODO - something to do the responsive refresh here 

  // const mql = window.matchMedia("(min-width: 0px) and (max-width: 740px)");
  // mql.addEventListener("change", (event) => {
  //   if(event.matches) {
  //     console.log('refresh advert 0', config.renderedSlots);
  //     googletag.cmd.push(() => {
  //       googletag.pubads().refresh([config.renderedSlots['advert-2']]);
  //     });
  //   }
  // });
}