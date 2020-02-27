const proxy = {

  // '/api/agent/': {
  //     target: 'http://172.16.248.192:8100',
  //     pathRewrite: {'^/api': '/product'},
  //     changeOrigin: true,
  //     secure: false
  // },

  '/api/': {
      // target: 'http://ladder.us.to',
      target: 'http://122.51.100.203',
      // pathRewrite: {'/api': ''},
      changeOrigin: true,
      secure: false
  },
  '/ws/': {
    // target: 'http://ladder.us.to',
    target: 'ws://122.51.100.203:80',
    ws: true,
    secure: false
  },
}

function raw(url) {
  return url
}

exports.proxy = proxy
exports.N = raw
