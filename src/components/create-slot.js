export function createSlot(slot, slotDefaults) {
  console.log('create slot');
  console.log(slot);
  // merge the slot dataset into the defaults
  const slotConfig = Object.assign(Object.assign({}, slotDefaults), slot.dataset);
  slotConfig.rootElement = slot;
  slotConfig.targeting = JSON.parse(slotConfig.targeting);
  slotConfig.sizes = JSON.parse(slotConfig.sizes);

  return slotConfig;
}