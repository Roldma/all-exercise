const express = require('express');
const path = require('path');

const App = express();
const PORT = process.env.PORT || 3333;

const root = path.resolve(__dirname, '../../');
const publicPath = path.resolve(root, './public/');
const buildPath = path.resolve(root, './build/');

App.use(express.static(publicPath));

App.get('/bundle', (req, res) => res.sendFile(path.join(buildPath, 'bundle.js')));

App.get('/', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));

App.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
