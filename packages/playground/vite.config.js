export default {
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  optimizeDeps: {
    include: ['@formily/antd']
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ]
  }
}
