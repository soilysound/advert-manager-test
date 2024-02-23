import { createSlot } from "./create-slot";

export function createSlots(config, slotDefaults) {
  console.log('create slots');
  return new Promise((resolve, reject) => {
    // get slots from page
    Array.from(document.querySelectorAll('.advert')).forEach(slot => {
      config.slots.push(createSlot(slot, slotDefaults))
    });
    resolve();
  });
}
