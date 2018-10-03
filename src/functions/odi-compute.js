const winston = require("@config/winston");
const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

/**
 * This function calcul the odi score of a patient with a mongoose schema in param
 * @param {Answer} answer
 */
function compute(answer) {
  const strCompare = "odiQuestion";
  let mark = 0;

  mark += answer.odiQuestion1;
  mark += answer.odiQuestion2;
  mark += answer.odiQuestion3;
  mark += answer.odiQuestion4;
  mark += answer.odiQuestion5;
  mark += answer.odiQuestion6;
  mark += answer.odiQuestion7;
  mark += answer.odiQuestion8;
  mark += answer.odiQuestion9;
  mark += answer.odiQuestion10;

  // Go through schema where key are equals to odiQuestionXX
  /*
  Object.keys(answer).forEach(key => {
    winston.info("key :", key, "value :", answer[key]);
    if (strCompare.localeCompare(key.substr(0, 11)) === 0) {
      mark += answer[key];
    }
  });
*/
  winston.info("odi score :", (mark / 10) * 20, "%");
  return (mark / 10) * 20;
}

function genDoc(answer) {
  // Load file in function of gender
  // Load the docx file as a binary
  const content = fs.readFileSync(
    path.resolve("src/assets/data/", "template_homme.docx"),
    "binary"
  );

  const zip = new JSZip(content);

  const doc = new Docxtemplater();
  doc.loadZip(zip);

  console.log(answer);
  // set the templateVariables
  doc.setData({
    doctor: answer.doctor,
    first_name: answer.first_name,
    last_name: answer.last_name,
    birth_date: getBirthDate(answer.birth_date),
    age: getAge(answer.birth_date),
    medical_consultant: answer.medical_consultant,
    job: answer.job, // NULL for unemployed
    activities: answer.activities,
    size: answer.size,
    weight: answer.weight,
    rank: answer.rank,
    sex: "M. or Mme",
    mark: compute(answer),
    antecedents: ["rhume"],
    suffering_time: "X"
  });

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties
    };
    winston.error(JSON.stringify({ error: e }));
    // The error thrown here contains additional information when logged with JSON.stringify
    // (it contains a property object).
    throw error;
  }

  const buf = doc.getZip().generate({ type: "nodebuffer" });

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  var filename = answer.first_name + "_" + answer.last_name + ".docx";
  fs.writeFileSync(path.resolve("src/assets/data/", filename), buf);
}

function getAge(birthDate) {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getBirthDate(date) {
  return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
}

module.exports = { compute, genDoc };
