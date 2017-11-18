
import { App } from '../../../conn/sqldb';

export default function (req, res) {
  return App
    .findOne({
      where: {
        clientId: req.query.client_id,
        redirectUri: req.query.redirect_uri,
      },
      attributes: ['id', 'name'],
    })
    .then((model) => {
      if (!model) return res.status(404).json({ error: 'Invalid Client' });
      return res.json(model);
    })
    .catch(err => res.status(400).json(err));
}
