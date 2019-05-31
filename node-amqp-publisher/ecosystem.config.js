// PM2 configuration (see https://pm2.io/doc/en/runtime/guide/ecosystem-file/)
module.exports = {
  apps: [{
    name: 'app',
    script: 'dist/server.js',
    instances: 1,
    autorestart: true,
    watch: 'dist/**/*.js',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },
  {
    name: 'app-watcher',
    script: 'npm start',
    instances: 1,
    autorestart: true,
    watch: 'tsconfig.json',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
