const router = require('express').Router();
const { Comment } = require('../../models');
const { update } = require('../../models/User');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put('/:id', async (req, res) =>{
await Comment.update(
{
    name: req.body.name,
    description: req.body.description, 
    date_created: req.body.date_created,
    user_id: req.body.user_id,    
},
).then((updatedComment) => {
 res.json(updatedComment);
})
 .catch((err) => {
    console.log(err);
    res.json(err);
 });
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;