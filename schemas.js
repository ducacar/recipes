const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');


const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
      'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
      escapeHTML: {
          validate(value, helpers) {
              const clean = sanitizeHtml(value, {
                  allowedTags: [],
                  allowedAttributes: {},
              });
              if (clean !== value) return helpers.error('string.escapeHTML', { value })
              return clean;
          }
      }
  }
});

const Joi = BaseJoi.extend(extension)


module.exports.recipeSchema = Joi.object({
  recipe: Joi.object({
    title: Joi.string().required().min(1).max(26).escapeHTML(),
    description: Joi.string().required().min(1).max(150).escapeHTML(),
    ingredients: Joi.string().required().min(1).max(1000).escapeHTML(),
    instructions: Joi.string().required().min(1).max(5000).escapeHTML()
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5),
    body: Joi.string().required().min(1).max(500).escapeHTML()
  }).required(),
});

