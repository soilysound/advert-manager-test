/* global require, document */
import Advert from './components/advert';

require('../styles/preview.css');

const components = document.querySelectorAll('[data-component-name=advert-test]');
for (let i = 0; i < components.length; i++) {
  Advert(components[i]);
}
