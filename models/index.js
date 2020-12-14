// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Product.belongsTo(Category, {
//   // foreignKey: "tag_name",
//   // onDelete: "Cascade",
// });

// // Categories have many Products

// Category.hasMany(Product, {
//   // foreignKey: "tag_name",
//   // onDelete: "Cascade",
// });

// // Products belongToMany Tags (through ProductTag)

// Product.belongsToMany(Tag, {
//   // foreignKey: "tag_name",
// });
// // Tags belongToMany Products (through ProductTag)

// Tag.belongsToMany(Product,{
//   // foreignKey: "tag_name",
// });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
