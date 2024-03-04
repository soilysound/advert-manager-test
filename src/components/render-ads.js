export function renderAds(config) {
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