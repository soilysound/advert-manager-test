'use strict';

var require$$0 = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

function imgsrc$1(path, size, breakpoint) {
  const src = path.replace(/{width}x{height}/, size);

  if (typeof breakpoint === 'string') {
    return `${src} ${breakpoint}`;
  }

  return src;
}

var imgsrc_1 = imgsrc$1;

function jsonData$1(context) {
  return JSON.stringify(context);
}

var jsonData_1 = jsonData$1;

const fs = require$$0__default["default"];

function renderFile$2(filePath) {
  return getFile(filePath) || '';
}

function getFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  return fs.readFileSync(filePath, 'utf8');
}

var renderFile_1 = renderFile$2;

const renderFile$1 = renderFile_1;

function renderIcon$1(icon) {
  return renderFile$1(
    `${process.cwd()}/node_modules/sdc-project-icons/icons/${icon}.svg`
  );
}

var renderIcon_1 = renderIcon$1;

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

/**
 * Looks up the passed key in translations/en.json
 * and returns the translation if available
 *
 * @param {String} key The translation key to lookup
 * @return {String}
 */

function translate$1(key) {
  const translations = getTranslations();
  if (!translations) {
    return key;
  }

  return key.split('.').reduce((obj, i) => obj[i] || key, translations);
}

/**
 * Returns any translations installed in the component
 *
 * @return {Object}
 */
function getTranslations() {
  try {
    return commonjsRequire(`${process.cwd()}/translations/en.json`);
  } catch(e) {
    return {};
  }
}

var translate_1 = translate$1;

function limit$1(arr, limit) {
  if (!Array.isArray(arr)) {
    return [];
  }

  if (limit) {
    return arr.slice(0, limit);
  }

  return arr;
}

var limit_1 = limit$1;

function interpolate$1(context) {
  var replacements = arguments;
  var replaceIndex = 1;

  return context.replace(/%s/g, function(match) {
    if (!replacements[replaceIndex]) {
      return match;
    }

    var replace = replacements[replaceIndex];
    replaceIndex++;

    return replace;
  });
}

var interpolate_1 = interpolate$1;

const imgsrc = imgsrc_1;
const jsonData = jsonData_1;
const renderFile = renderFile_1;
const renderIcon = renderIcon_1;
const translate = translate_1;
const limit = limit_1;
const interpolate = interpolate_1;

const helpers = {
  imgsrc,
  jsonData,
  renderFile,
  renderIcon,
  translate,
  limit,
  interpolate
};

var all = helpers;

module.exports = all;
