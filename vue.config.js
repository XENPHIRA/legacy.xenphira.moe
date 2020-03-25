module.exports = {
  devServer: {
    disableHostCheck: true
  },
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: 'docs/',
  publicPath: "/",
  chainWebpack: config => {
    config.module
      .rule('file')
      .test(/\.txt$/)
      .use('file-loader')
      .loader('file-loader')
      .end()
  },
  pages: {
    'robots.txt': {
      entry: './public/robots.txt'
    },
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
    'data': {
      entry: './src/pages/data/main.js',
      template: 'public/index.html',
      title: 'DATA',
      chunks: [ 'chunk-vendors', 'chunk-common', 'data' ]
    },
    'fastats': {
      entry: './src/pages/datafastats/main.js',
      template: 'public/index.html',
      title: 'fa-stats | DATA',
      chunks: [ 'chunk-vendors', 'chunk-common', 'fastats' ]
    },
    'music': {
      entry: './src/pages/music/main.js',
      template: 'public/index.html',
      title: 'MUSIC',
      chunks: [ 'chunk-vendors', 'chunk-common', 'music' ]
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