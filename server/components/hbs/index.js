
import path from 'path';
import handlebars from 'handlebars';
import fs from 'fs';

import config from '../../config/environment';

const hbs = {
  render(view, data) {
    const template = fs.readFileSync(`${path
      .join(config.root, 'server/components/hbs/templates')}/${view}.hbs`, 'utf8');
    return handlebars.compile(template)(Object.assign(hbs.defaults[template] || {}, data));
  },
}

hbs.fields = (view) => {
  const template = fs.readFileSync(`${path
    .join(config.root, 'server/components/hbs/templates')}/${view}.hbs`, 'utf8');
  return template.match(/{([^{}]+)}/g).map(x => x.slice(1, -1)).filter(x => !x.includes(' '));
};

export default hbs;
