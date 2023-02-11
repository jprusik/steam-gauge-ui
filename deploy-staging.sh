. ./.env && npm run build && scp -C -r build/* $DEPLOY_STAGING_USER@$DEPLOY_STAGING_DOMAIN:$DEPLOY_STAGING_PATH
