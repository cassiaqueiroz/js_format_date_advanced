'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const fromParts = date.split(fromSeparator);

  if (fromParts.length !== 3) {
    throw new Error('invalid date');
  }

  const originEntries = fromFormat
    .slice(0, 3)
    .map((pattern, i) => [pattern, fromParts[i]]);
  const originDateParts = Object.fromEntries(originEntries);

  // calcula fullYear e shortYear a partir dos dados de origem
  let fullYear;

  if ('YYYY' in originDateParts) {
    fullYear = originDateParts['YYYY'];
  } else if ('YY' in originDateParts) {
    const yy = originDateParts['YY'];

    if (!/^\d{2}$/.test(yy)) {
      throw new Error('invalid year');
    }
    fullYear = (Number(yy) < 30 ? '20' : '19') + yy;
  }

  const shortYear = fullYear ? fullYear.slice(-2) : undefined;

  const resultParts = toFormat.slice(0, 3).map((token) => {
    if (token === 'YYYY') {
      return fullYear;
    }

    if (token === 'YY') {
      return shortYear;
    }

    return originDateParts[token];
  });

  if (resultParts.includes(undefined)) {
    throw new Error('invalid date');
  }

  return resultParts.join(toFormat[3]);
}

module.exports = formatDate;
