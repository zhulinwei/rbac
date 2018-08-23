function getEnv(name) { return process.env[name] };

module.exports = {
  mongodb: {
    test: {
      url: getEnv("MONGODB"),
      options: {},
    },
  }
}
