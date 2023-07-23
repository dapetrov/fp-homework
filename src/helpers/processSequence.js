import {
  andThen,
  applySpec,
  compose,
  curry,
  flip,
  ifElse,
  isEmpty,
  length,
  match,
  prop,
  tap,
} from "ramda";
import Api from "../tools/api";

const api = new Api();

const getResult = prop("result");
const getValue = prop("value");

const validateValue = match(/^[0-9.]{3,9}$/g);

const logError = ({ handleError }) => handleError("ValidationError");
const checkValue = compose(isEmpty, validateValue, getValue);

const curriedGet = curry(api.get);
const getNumber = curriedGet("https://api.tech/numbers/base");

const getUrl = (id) => `https://animals.tech/${id}`;
const getMod3 = (value) => value % 3;
const squared = (value) => value * value;

const getNum = compose(Math.round, Number, getValue);

const flippedGet = flip(curriedGet);
const curriedFlippedAnimalGet = flippedGet({});
const animal = curriedFlippedAnimalGet;

const processSequence = (input) => {
  const write = curry(input.writeLog);
  const succ = curry(input.handleSuccess);

  const writeStartValue = compose(write, getValue);

  const getOptions = applySpec({
    from: () => 10,
    to: () => 2,
    number: compose(tap(write), getNum),
  });

  const writeResult = compose(succ, getResult);

  const processNumber = compose(
    tap(write),
    getMod3,
    tap(write),
    squared,
    tap(write),
    length
  );

  const getAnimal = compose(
    andThen(writeResult),
    animal,
    getUrl,
    processNumber,
    tap(write),
    getResult
  );

  const work = compose(andThen(getAnimal), getNumber, getOptions);
  const validate = ifElse(checkValue, logError, work);

  compose(validate, tap(writeStartValue))(input);
};

export default processSequence;
