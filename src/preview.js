/* global require, document */
import Advert from './components/ui-advert';

require('../styles/preview.css');

const components = document.querySelectorAll('[data-component-name="advert-manager"]');
for (let i = 0; i < components.length; i++) {
  Advert(components[i]);
}
