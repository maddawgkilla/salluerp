const path = require('path');

module.exports = {
  entry: './tableexport.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};