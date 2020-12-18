const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll(req.params.id, {
      include: [{ model: Category }, {model: Tag, through: ProductTag}],
    });

    if (!productData){
      res.status(404).json({ message: "Guess This Didnt Work"})
      return;
    }
    
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productIdData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productIdData) {
      res.status(404).json({ message: 'No Product found with that ID!'});
      return;
    }
    res.status(200).json(productIdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
 /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(productTagIds);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:product_id', (req, res) => {
  // update product data
  ProductTag.update(
    {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      console.log(product)
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.product_id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
// delete one product by its `id` value -COMPLETED
router.delete('/:id', async (req, res) => { 
  try {
    const productDeleteId = await Product.destroy({
    where: {
      id: req.params.id,
    },
  })
  if(!productDeleteId){
    res.status(404).json({message: "No Product found with this ID to delete"});
    return;
  }
  res.status(200).json(productDeleteId);
} catch (error) {
  res.status(500).json(error);
}
});

module.exports = router;