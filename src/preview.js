/* global require, document */
import AdvertTest from './components/advert-test';

require('../styles/preview.css');

const components = document.querySelectorAll('[data-component-name=advert-test]');
for (let i = 0; i < components.length; i++) {
  AdvertTest(components[i]);
}