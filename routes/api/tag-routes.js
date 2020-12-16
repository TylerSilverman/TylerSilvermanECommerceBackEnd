const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}, { model: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag ID Found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

 // create a new tag
router.post('/', async (req, res) => {
  try {
    const tagRoutes = await Tag.create(req.body);
    res.status(200).json(tagRoutes);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagRoutes = await ProductTag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagRoutes[0]) {
      res.status(404).json({ message: 'No ProductTags with this id!' });
      return;
    }
    res.status(200).json(tagRoutes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
