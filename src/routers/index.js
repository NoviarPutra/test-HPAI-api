const routerUsers = require("./user.routes");

const routers = (app) => {
  app.use("/api", routerUsers);
};

module.exports = routers;
