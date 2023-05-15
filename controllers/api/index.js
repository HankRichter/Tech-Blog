const router = require("express").Router();
const userRoutes = require("./UserRoutes");
const blogRoutes = require("./BlogRoutes");
const commentRoutes = require("./CommentRoutes");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);


module.exports = router;
