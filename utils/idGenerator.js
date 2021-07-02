let idGenerator = (length, name) => {
  let id = "vel";
  for (let i = 0; i < length; i++) {
    id = id.concat(String(Math.floor(Math.random() * 10)));
  }
  return `${id}${name[0]}${name[1]}${name[2]}`;
};

module.exports = idGenerator;
