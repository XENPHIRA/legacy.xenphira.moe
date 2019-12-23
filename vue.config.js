module.exports = {
  devServer: {
    disableHostCheck: true
  },
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: 'docs/',
  publicPath: "/",
  pages: {
    'nsfw/index': {
      entry: './src/pages/index/main.js',
      template: 'public/index.html',
      title: 'HOME',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'index': {
      entry: './src/pages/index/main.js',
      template: 'public/index.html',
      title: 'HOME',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'nsfw/social': {
      entry: './src/pages/social/main.js',
      template: 'public/index.html',
      title: 'SOCIAL',
      chunks: [ 'chunk-vendors', 'chunk-common', 'social' ]
    },  
    'social': {
      entry: './src/pages/social/main.js',
      template: 'public/index.html',
      title: 'SOCIAL',
      chunks: [ 'chunk-vendors', 'chunk-common', 'social' ]
    }, 
    'nsfw/ref': {
      entry: './src/pages/ref/main.js',
      template: 'public/index.html',
      title: 'REFERENCES',
      chunks: [ 'chunk-vendors', 'chunk-common', 'ref' ]
    },
    'ref': {
      entry: './src/pages/ref/main.js',
      template: 'public/index.html',
      title: 'REFERENCES',
      chunks: [ 'chunk-vendors', 'chunk-common', 'ref' ]
    },
    'nsfw/waitlist': {
      entry: './src/pages/commission-waitlist/main.js',
      template: 'public/index.html',
      title: 'COMMISSION WAITLIST',
      chunks: [ 'chunk-vendors', 'chunk-common', 'waitlist' ]
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
    },
    '404': {
      entry: './src/pages/404/main.js',
      template: 'public/index.html',
      title: '404 OOPS',
      chunks: [ 'chunk-vendors', 'chunk-common', '404' ]
    }
  }
}