module.exports = {
  apps: [
    {
      name: 'PictySchool API',
      script: './dist/src/main.js',
      instances: 2,
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'production',
        PORT: '3000'
      }
    }
  ]
};
