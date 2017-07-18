
import defaultFeed from './feed.json';

const feed = (req, res) => res.json(defaultFeed);

export default function (app) {
  app.use('/api/feed', feed);
}
