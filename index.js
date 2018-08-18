const logSomething = options => ({
  ...options,
  anotherOption: 'hello!',
});

const options = logSomething({ one: '1', two: '2' });

console.log(options);
