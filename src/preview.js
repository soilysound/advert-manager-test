/* global require, document */
import Advert from './components/ui-advert';

require('../styles/preview.css');

const components = document.querySelectorAll('[data-component-name="advert-manager"]');
for (let i = 0; i < components.length; i++) {
  Advert(components[i]);
}

// try adding an advert after load
// use a css animation event or mutation observer to grab new adverts added after load
const button = document.createElement('button');
button.textContent = 'Clone first advert';
button.onclick = () => {
  const lazySlot = document.querySelector('.ui-advert').cloneNode();
  lazySlot.dataset.id = 'advert-cloned';
  lazySlot.id = 'advert-cloned';
  document.body.appendChild(lazySlot);
};

document.body.appendChild(button);
