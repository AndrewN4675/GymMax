// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // Change to true for a permanent redirect
      },
    ]
  },
}
