// This file is an entry point for tests

const context = require.context('./js', true, /\.js$/);

context.keys().forEach(context);
