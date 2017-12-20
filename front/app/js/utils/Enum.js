// Originally from https://github.com/wwayne/es6-enum

const Enum = (...args) => {
  return Array.from(args).reduce((acc, arg) => {
    acc[arg] = Symbol(arg); // Globally unique 
    // acc[arg] = arg;
    return acc;
  }, {});
};

export default Enum;