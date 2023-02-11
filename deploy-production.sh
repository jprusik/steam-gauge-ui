. ./.env && npm run build && scp -C -r build/* $DEPLOY_USER@$DEPLOY_DOMAIN:$DEPLOY_PATH
