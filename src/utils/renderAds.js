export default function (config) {
    // call google render ads function here
    config.slots.forEach((slot) => {
      const slotTag = slot.rootElement.getAttribute('data-tag');

      // Don't repush slot
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