git remote update
CHANGED=$(git diff dev origin/dev)
NPM_CHANGED=$(git diff origin/dev dev -- package.json)

if [ -n "$CHANGED" ]; then
  echo "Executing"
else
  curl -X POST --data-urlencode "payload={\"text\": \"msgque-dev: nothing changed\"}" "$SLACK_URL"
  exit 1 ;
fi

git reset --hard;
git branch -D dev
git remote update origin;
git checkout dev;
git pull origin dev;

COMMIT_MSG=$(git log --format=oneline -n 1 | sed -r 's/^.{30}//')
COMMIT=$(git rev-parse HEAD);
USER=$(git --no-pager show -s --format='%an' "$COMMIT")

if [ -n "$NPM_CHANGED" ]; then
  npm prune
  npm install
fi

curl -X POST --data-urlencode "payload={\"text\": \"msgque-dev: @$USER Build Started\"}" "$SLACK_URL"
gulp build;

cd dist

npm install --production
cp ../.env .env
cp ../.sequelizerc .sequelizerc
kill -HUP $(/usr/sbin/lsof -i:5566 -t);

sequelize db:migrate
curl -X POST --data-urlencode "payload={\"text\": \"msgque-dev: $COMMIT_MSG - @$USER please test in https://staging-accounts.quezx.com  \"}" "$SLACK_URL"

