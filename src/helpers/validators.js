import {
  allPass,
  any,
  compose,
  countBy,
  dissoc,
  equals,
  gte,
  identity,
  prop,
  values,
  propEq,
  complement,
} from "ramda";

// Операции сравнения
const greaterOrEquals = (a) => (b) => gte(b, a);
const greaterOrEqualsTwo = greaterOrEquals(2);
const greaterOrEqualsThree = greaterOrEquals(3);
const anyGreaterOrEqualsThree = any(greaterOrEqualsThree);
const anyValueGreaterOrEqualsThree = compose(anyGreaterOrEqualsThree, values);

// Геттеры фигур
const getProp = (property) => prop(property);
const getStar = getProp("star");
const getTriangle = getProp("triangle");
const getSquare = getProp("square");
const getCircle = getProp("circle");

// Сравнения цветов
const isColor = (color) => equals(color);
const isRed = isColor("red");
const isWhite = isColor("white");
const isGreen = isColor("green");
const isOrange = isColor("orange");
const isBlue = isColor("blue");
const dissocWhite = dissoc("white");
const getGreen = getProp("green");
const twoGreens = propEq("green", 2);
const oneRed = propEq("red", 1);

// Все цвета
const countAllColors = compose(countBy(identity), values);
const countColorsWithoutWhite = compose(dissocWhite, countAllColors);

// Базовые композиции геттеров и сравнения цветов
const isRedStar = compose(isRed, getStar);
const isWhiteStar = compose(isWhite, getStar);
const isNotRedStar = complement(isRedStar);
const isNotWhiteStar = complement(isWhiteStar);

const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);

const isWhiteTriangle = compose(isWhite, getTriangle);
const isGreenTriangle = compose(isGreen, getTriangle);
const isNotWhiteTriangle = complement(isWhiteTriangle);

const isGreenSquare = compose(isGreen, getSquare);
const isOrangeSquare = compose(isOrange, getSquare);
const isWhiteSquare = compose(isWhite, getSquare);
const isNotWhiteSquare = complement(isWhiteSquare);

// Функции с логикой, специфичной для задания
const isRedEqualsBlue = ({ blue, red }) => blue === red;
const isSquareEqualsTriangle = ({ square, triangle }) => square === triangle;

const countTwoGreenColors = compose(twoGreens, countAllColors);
const countOneRedColor = compose(oneRed, countAllColors);

const isAllColorsOf = (color) => compose(propEq(color, 4), countAllColors);

const countGreenColors = compose(getGreen, countAllColors);

// Валидация полей
export const validateFieldN1 = allPass([
  isRedStar,
  isGreenSquare,
  isWhiteTriangle,
  isWhiteCircle,
]);
export const validateFieldN2 = compose(greaterOrEqualsTwo, countGreenColors);
export const validateFieldN3 = compose(isRedEqualsBlue, countAllColors);
export const validateFieldN4 = allPass([
  isRedStar,
  isBlueCircle,
  isOrangeSquare,
]);
export const validateFieldN5 = compose(
  anyValueGreaterOrEqualsThree,
  countColorsWithoutWhite
);
export const validateFieldN6 = allPass([
  isGreenTriangle,
  countTwoGreenColors,
  countOneRedColor,
]);
export const validateFieldN7 = isAllColorsOf("orange");
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);
export const validateFieldN9 = isAllColorsOf("green");
export const validateFieldN10 = allPass([
  isNotWhiteSquare,
  isNotWhiteTriangle,
  isSquareEqualsTriangle,
]);
