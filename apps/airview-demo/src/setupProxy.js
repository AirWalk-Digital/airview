const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/cms/export",
    createProxyMiddleware({
      target: "http://localhost:5001",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/cms",
    createProxyMiddleware({
      target: "http://localhost:5002",
      changeOrigin: true,
    })
  );
};
