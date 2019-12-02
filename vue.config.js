module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: 'docs/',
  pages: {
    'index': {
      entry: './src/pages/index/main.js',
      template: 'public/index.html',
      title: 'HOME | XENPHIRA',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    }, 
    'music': {
      entry: './src/pages/music/main.js',
      template: 'public/index.html',
      title: 'MUSIC | XENPHIRA',
      chunks: [ 'chunk-vendors', 'chunk-common', 'music' ]
    }, 
    'social': {
      entry: './src/pages/social/main.js',
      template: 'public/index.html',
      title: 'SOCIAL | XENPHIRA',
      chunks: [ 'chunk-vendors', 'chunk-common', 'social' ]
    }, 
    'ref': {
      entry: './src/pages/ref/main.js',
      template: 'public/index.html',
      title: 'REFERENCES | XENPHIRA',
      chunks: [ 'chunk-vendors', 'chunk-common', 'ref' ]
    }, 
  }
}