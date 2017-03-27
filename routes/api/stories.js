module.exports = function (router) {
  // /api/stories
  router.get('/stories', function (req, res, next) {
    const stories = [
      {
        id: '1',
        name: 'Storming of the Bastille',
        description: 'The Storming of the Bastille occurred in Paris, France, on the afternoon of 14 July 1789. The medieval fortress, armory, and political prison in Paris known as the Bastille represented royal authority in the center of Paris. The prison contained just seven inmates at the time of its storming but was a symbol of abuses by the monarchy; its fall was the flashpoint of the French Revolution.',
      },
      {
        id: '2',
        name: 'Coup of 18 Brumaire',
        description: 'The coup of 18 Brumaire brought General Napoleon Bonaparte to power as First Consul of France, and, in the view of most historians, ended the French Revolution.'
      }
    ];

    res.json(stories);
  });
};
