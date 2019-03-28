module.exports = {
  findByIdAndUpdate,
  findOne
};

let curr = 0;
async function findByIdAndUpdate(id, action) {
  return ++curr;
}

async function findOne(search) {
  return { sequenceVal: curr };
}
