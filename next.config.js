module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/fr',
        permanent: true,
      }
    ]
  }
  //   exportTrailingSlash: true
};
