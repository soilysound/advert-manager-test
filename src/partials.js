const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(process.cwd());

module.exports = {
  'ui-advert-slot': fs.readFileSync(path.join('./partials/ui-advert-slot.hbs')).toString()
};
