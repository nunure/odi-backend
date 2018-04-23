const winston = require('winston');

/**
 * This function calcul the odi score of a patient with a mongoose schema in param
 * @param {Answer} answer
 */
function compute(answer) {
  const strCompare = 'odiQuestion';
  let mark = 0;

  // Go through schema where key are equals to odiQuestionXX
  Object.keys(answer.model).forEach((key) => {
    winston.info('key :', key, 'value :', answer.model[key]);
    if (strCompare.localeCompare(key.substr(0, 11)) === 0) {
      mark += answer.model[key];
    }
  });

  winston.info('odi score :', (mark / 10) * 20, '%');
  return (mark / 10) * 20;
}

module.exports = compute;
