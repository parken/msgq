
import liveair from './liveair';

export default function (app) {
  // interceptors not require our login
  // liveair https://trello.com/c/LnbFyCwE/75-httpapi
  app.use('/api', liveair);
}
