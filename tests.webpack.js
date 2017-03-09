var testsContext = require.context('./tests', true, /_test\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./tests', true, /^((?!tests).)*.js$/);
srcContext.keys().forEach(srcContext);
