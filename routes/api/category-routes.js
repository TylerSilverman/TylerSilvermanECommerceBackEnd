const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(req.params.id, {
      include: [{ model: Product}, { model: Tag}],
    });

    if (!categoryData){
      res.status(404).json({ message: "Guess This Didnt Work"})
      return;
    }
    
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});
// get a category by its `id` value --COMPLETED
router.get('/:id', async (req, res) => {
  try {
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categoryID){
      res.status(404).json({message: "No Category found with this ID"});
      return;
    }
    res.status(200).json(categoryID);
  } catch (error) {
    res.status(500).json(error);
  }
});
//post /api by its `id` value --COMPLETED
router.post('/', async (req, res) => {
  try {
    const locationData = await Category.create(req.body);
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update a category by its `id` value --COMPLETED
router.put('/:id', async (req, res) => {
  try {
    const categoryUpdatePut = await Category.update(req.body, {
      where: {
        category_id: req.body.category_id,
      }
    });
    if(!categoryUpdatePut){
      res.status(404).json({message: "No Category found with this ID"});
      return;
    }
    res.status(200).json(categoryUpdatePut);
  } catch (error) {
    res.status(500).json(error);
  }
});


 // delete a category by its `id` value --COMPLETED
router.delete('/:id', async (req, res) => { 
  try {
    const categoryDeleteId = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  if(!categoryDeleteId){
    res.status(404).json({message: "No Category found with this ID to delete"});
    return;
  }
  res.status(200).json(categoryDeleteId);
} catch (error) {
  res.status(500).json(error);
}
});

module.exports = router;
