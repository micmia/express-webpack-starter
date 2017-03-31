const Story = require('../../models/story');

module.exports = (router) => {
  // GET /api/stories
  router.get('/stories', (req, res, next) => {
    Story.find(null, null, (err, stories) => {
      if (err) {
        return next(err);
      }

      res.json(stories);
    });
  });

  // GET /api/stories/{id}
  router.get('/stories/:id', (req, res, next) => {
    const {id} = req.params;

    Story.findById(id, (err, story) => {
      if (err) {
        return next(err);
      }

      res.json(story);
    });
  })

  // POST /api/stories
  router.post('/stories', (req, res, next) => {
    const story = Object.assign(new Story(), req.body);

    story.save(err => {
      if (err) {
        return next(err);
      }

      res.json(story);
    });
  });

  // DELETE /api/stories/{id}
  router.delete('/stories/:id', (req, res, next) => {
    Story.remove({_id: req.params.id}, err => {
      if (err) {
        return next(err);
      }

      res.json({
        success: true
      });
    });
  });
};
