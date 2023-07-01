const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdGenerator = (minId, maxId) => {
  const getRandomId = [];

  return function () {
    let currentIdValue = getRandomNumber(minId, maxId);

    if (getRandomId.length >= (maxId - minId + 1)) {
      return null;
    }

    while (getRandomId.includes(currentIdValue)) {
      currentIdValue = getRandomNumber(minId, maxId);
    }

    getRandomId.push(currentIdValue);

    return currentIdValue;
  };
};


const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];


export {getRandomNumber, createRandomIdGenerator, getRandomArrayElement};
