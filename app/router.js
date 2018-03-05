// app/router.js
module.exports = app => {
  require('./router/page')(app);
  require('./router/api')(app);
  // require('./router/gallery')(app);
};
