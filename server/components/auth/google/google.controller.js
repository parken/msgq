import rp from 'request-promise';
import env from '../../../config/env';

export function login(req, res) {
  const path = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&' +
    `scope=${env.auth.google.scope}&access_type=offline&redirect_uri=${
    env.auth.google.redirect_uri}&client_id=${env.auth.google.client_id
  }&include_granted_scopes=true`;
  res.writeHead(302, { Location: path });
  return res.end();
}

export function callback(req, res) {
  return rp({
    method: 'POST',
    uri: 'https://www.googleapis.com/oauth2/v4/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      grant_type: 'authorization_code',
      redirect_uri: env.auth.google.redirect_uri,
      client_id: env.auth.google.client_id,
      client_secret: env.auth.google.client_secret,
      code: req.query.code,
    },
    json: true,
  })
    .then(token =>
      rp({
        method: 'GET',
        uri: 'https://www.googleapis.com/plus/v1/people/me',
        headers: { Authorization: `Bearer ${token.access_token}` },
        json: true,
      }).then(user => Promise.resolve([token, user])))
    .then(([token, { gender, emails, id, displayName, image: { url: image }, url }]) => {
      const user = {
        gender,
        email: emails.filter(x => (x.type === 'account'))[0].value,
        googleId: id,
        name: displayName,
        image,
        link: url,
        googleToken: token,
      };
      return rp({
        method: 'POST',
        uri: `${env.PLAY_URL}/api/users/googleLogin`,
        headers: { Authorization: 'Bearer eGNsaWVudGlkOnhjbGllbnRzZWNyZXQ=' },
        body: user,
        json: true,
      });
    })
    .then(token => res.json(token))
    .catch(err => console.log(err));
}
