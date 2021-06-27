let idGenerator = (length) => {
  let id = "warp";
  for (let i = 0; i < length; i++) {
    id = id.concat(String(Math.floor(Math.random() * 10)));
  }
  return id;
};

module.exports = idGenerator;
