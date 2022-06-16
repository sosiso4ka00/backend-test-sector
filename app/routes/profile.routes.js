const { authJwt } = require("../middleware");
const ProfileController = require("../controllers/profile.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.put("/profile/:id", [authJwt.verifyToken], ProfileController.ProfileEdit);

  app.get("/profile/:id", [authJwt.verifyToken], ProfileController.GetProfile);

  app.get("/profiles", ProfileController.GetProfiles);
};
