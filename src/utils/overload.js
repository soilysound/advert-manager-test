import renderAds from "./renderAds";

export default function (config) {
  if (!window.adSlots) {
    window.adSlots = new Array();
  }
  
  renderAds({
    slots: window.adSlots
  })

  window.adSlots.push = function () {
    Array.prototype.push.apply(this, arguments)
    renderAds({
      slots: Array.from(arguments)
    })
  }
}