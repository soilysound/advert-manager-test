import renderAds from "./renderAds";

export default function (config) {
  if (!window.adSlots) {
    window.adSlots = new Array();
  }

  window.adSlots.push = function () {
    Array.prototype.push.apply(this, arguments)
    config.slots = window.adSlots;
    renderAds(config);
  }
}