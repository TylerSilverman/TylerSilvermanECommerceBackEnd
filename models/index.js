// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Product.belongsTo(Category, {
//   primaryKey: "id",
//   onDelete: "Cascade",
// });

// // Categories have many Products

// Category.hasMany(Product, {
//   primaryKey: "id",
//   onDelete: "Cascade",
// });

// // Products belongToMany Tags (through ProductTag)

// Product.belongsToMany(Tag, {
//   primaryKey: "id",
// });
// // Tags belongToMany Products (through ProductTag)

// Tag.belongsToMany(Product,{
//   primaryKey: "id",
// });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
