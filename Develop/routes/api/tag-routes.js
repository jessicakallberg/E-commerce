const router = require('express').Router();
const res = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name","price", "stock", "category_id"],
      }
    ]
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
  },
    attributes: ["id", "tag_name"],
    include: [
    {
      model: Product,
      attributes: ["id", "product_name","price", "stock", "category_id"]
    }
  ]
})
.then((dbTagData) => res.json(dbTagData))
.catch((err) => {
  console.log(err);
  res.status(500).json({ message: 'No tag found with this id' });;
})
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json({message: "New tag NOT created"})
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((dbTagData) => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json({message: "New tag NOT updated"})
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;