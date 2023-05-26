const Recipe = require("../models/recipe");
const cloudinary = require("cloudinary").v2;

module.exports.index = async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = { title: { $regex: new RegExp(search, "i") } };
  }

  const recipes = await Recipe.find(query);
  res.render("recipes/index", { recipes });
};

module.exports.renderNewForm = (req, res) => {
  res.render("recipes/new");
};

module.exports.createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body.recipe);
  recipe.author = req.user._id;
  recipe.images = req.file
    ? [{ url: req.file.path, filename: req.file.filename }]
    : [];
  await recipe.save();
  req.flash("success", "You successfully added a new recipe!");
  res.redirect(`/recipes/${recipe._id}`);
};

module.exports.showRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  if (!recipe) {
    req.flash("error", "Sorry, cannot find that recipe.");
    return res.redirect("/recipes");
  }
  res.render("recipes/show", { recipe });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    req.flash("error", "Sorry, cannot find that recipe.");
    return res.redirect("/recipes");
  }

  res.render("recipes/edit", { recipe });
};

module.exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
  req.flash("success", "You successfully updated recipe!");
  res.redirect(`/recipes/${recipe._id}`);
};

module.exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (recipe.images.length > 0) {
    const { url, filename } = recipe.images[0];
    await cloudinary.uploader.destroy(filename);
  }
  await Recipe.findByIdAndDelete(id);
  req.flash("success", "You successfully deleted your recipe!");
  res.redirect("/recipes");
};
