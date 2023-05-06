const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const auth = require("../auth")


router.post("/registers", (request, res) => {
	userController.registerUser(request.body).then(resultFromController => res.send(resultFromController));
});

router.post("/login", (request, res) => {
	userController.loginUser(request.body).then(resultFromController => res.send(resultFromController));
});

router.post("/updatetoAdmin", (request, res) => {
	userController.updateAdminUser(request.body).then(resultFromController => res.send(resultFromController));
});

router.delete("/deleteUser", (request, res) => {
	userController.deleteUserbyAdmin(request.body).then(resultFromController => res.send(resultFromController));
});

router.post("/saveCalc", (request, res) => {
	userController.saveCalculationstring(request.body).then(resultFromController => res.send(resultFromController));
});

router.post("/viewStrings", (request, res) => {
	userController.viewStrings(request.body).then(resultFromController => res.send(resultFromController));
});

router.post("/clearHistory", (request, res) => {
	userController.delHistory(request.body).then(resultFromController => res.send(resultFromController));
});

router.post("/:userId/userDetails",/* auth.verify,*/ (request, respond) => {
	const userId = request.params.userId;

	const data = {
		userId: userId
	  };

	  userController.getUserDetails(data).then(resFromManipulator => respond.send(resFromManipulator));
});


router.get("/details", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	userController.getProfile({id: userData.id}).then(resultFromController => res.send(resultFromController))
});

router.post("/comments", (request, res) => {
	userController.comments(request.body).then(resultFromController => res.send(resultFromController));
});



module.exports = router;