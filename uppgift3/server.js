const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post('/players', (req, res) => {
  const playerName = req.body.name;

  if (playerName) {
    const players = router.db.get('players');
    const playerId = players.size().value() + 1;
    players.push({ id: playerId, name: playerName }).write();
    res.status(201).json({ id: playerId, name: playerName });
  } else {
    res.status(400).json({ error: 'Player name is required' });
  }
});

server.use(router);
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
