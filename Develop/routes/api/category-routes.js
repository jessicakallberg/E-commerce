const router = require('express').Router();
const {Category,Product} = require('../../models')

//GET all categories
router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    Category.findAll({
        include: [Product]
    }) 
    .then((categories) => {
        res.json(categories)
    })
  });

//GET one category
router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [Product]
    })
  });
//POST a category
router.post('/', (req, res) => {
    Category.create({
      category_name: req.body.category_name
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
//update (PUT) a category
router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
      .then((dbCategoryData) => res.json(dbCategoryData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
      });
//DELETE a category
router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((dbCategoryData) => res.json(dbCategoryData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  });
  
  module.exports = router;
