module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: 'docs/',
  publicPath: "/",
  pages: {
    'index': {
      entry: './src/pages/index/main.js',
      template: 'public/index.html',
      title: 'HOME',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    }, 
    'social': {
      entry: './src/pages/social/main.js',
      template: 'public/index.html',
      title: 'SOCIAL',
      chunks: [ 'chunk-vendors', 'chunk-common', 'social' ]
    }, 
    'ref': {
      entry: './src/pages/ref/main.js',
      template: 'public/index.html',
      title: 'REFERENCES',
      chunks: [ 'chunk-vendors', 'chunk-common', 'ref' ]
    }, 
    'waitlist': {
      entry: './src/pages/commission-waitlist/main.js',
      template: 'public/index.html',
      title: 'COMMISSION WAITLIST',
      chunks: [ 'chunk-vendors', 'chunk-common', 'waitlist' ]
    },
    'timeline': {
      entry: './src/pages/commission-waitlist/timeline.js',
      template: 'public/index.html',
      title: 'COMMISSION WAITLIST TIMELINE',
      chunks: [ 'chunk-vendors', 'chunk-common', 'timeline' ]
    }
  }
}