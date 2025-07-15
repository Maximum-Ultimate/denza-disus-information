module.exports = {
  apps: [
    {
      name: 'disus-information',
      script: '/home/buildyourdreams-disus-technology/.nvm/versions/node/v22.17.0/bin/serve',
      args: ['-s', 'dist', '-l', '3180'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};