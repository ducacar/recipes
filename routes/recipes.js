const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const { isLoggedIn, isAuthor, validateRecipe } = require("../middleware");
const recipes = require("../controllers/recipes");

router
  .route("/")
  .get(catchAsync(recipes.index))
  .post(
    upload.single("image"),
    isLoggedIn,
    validateRecipe,
    catchAsync(recipes.createRecipe)
  );

router.get("/new", isLoggedIn, recipes.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(recipes.showRecipe))
  .put(isLoggedIn, isAuthor, validateRecipe, catchAsync(recipes.updateRecipe))
  .delete(isLoggedIn, isAuthor, catchAsync(recipes.deleteRecipe));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(recipes.renderEditForm)
);

module.exports = router;
