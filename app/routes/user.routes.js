const { authJwt } = require("../middleware");

const AuthController = require("../controllers/auth.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });  

  app.post(
    "/user/register",
    AuthController.signup
  );

  app.post(
    "/user/login",
    AuthController.signin
  );
  
};
