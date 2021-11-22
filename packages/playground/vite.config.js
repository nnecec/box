export default {
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'root-entry-name': 'default',
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ]
  }
}
