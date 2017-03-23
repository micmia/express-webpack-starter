function buildConfig(env) {
  return require('./webpack.' + env + '.config');
}

module.exports = buildConfig;