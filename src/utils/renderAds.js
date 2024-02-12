export default function (config) {
    console.log('Execute renderAds');
    config.slots.forEach((slot) => {
      const slotTag = slot.rootElement.getAttribute('data-tag');

      if (!slotTag) {
        return;
      }

      googletag.cmd.push(() => {
        slot.rootElement.innerHTML = '';

        googletag.pubads().enableSingleRequest();
        googletag.defineSlot(slotTag, [300, 250], slot.id).addService(googletag.pubads());
        googletag.display(slot.id);
        googletag.enableServices();
      });
    });
  }