const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  try {
    const tagDataID = await Tag.findAll(req.params.id, {
      include: [{ model: Product }, {model: ProductTag}],
    });
    if (!tagDataID) {
      res.status(404).json({ message: 'No Tag ID Found with that id!' });
      return;
    }
    res.status(200).json(tagDataID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}, { model: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag ID Found with that ID!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.Create (req.body.newProductTags);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});



router.put('/tag/:id', (req, res) => {
  
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
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

 // delete on tag by its `id` value
router.delete('/:tag_id', (req, res) => {
 Tag.destroy({
   where: {
     tag_id: req.params.tag_id,
   },
 }).then((deleteTag) => {
   res.json(deleteTag);
 }).catch((err) => res.json(err));
});

module.exports = router;
