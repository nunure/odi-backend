const winston = require("winston");
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

  // Go through schema where key are equals to odiQuestionXX
  Object.keys(answer.model).forEach(key => {
    winston.info("key :", key, "value :", answer.model[key]);
    if (strCompare.localeCompare(key.substr(0, 11)) === 0) {
      mark += answer.model[key];
    }
  });

  winston.info("odi score :", mark / 10 * 20, "%");
  return mark / 10 * 20;
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

  // set the templateVariables
  doc.setData({
    sex: "M. or Mme",
    first_name: answer.model.test1,
    last_name: answer.model.test2,
    birth_date: "XX/XX/XXXX",
    age: "XX",
    weight: "XX",
    size: "XX",
    activities: ["boulot", "metro", "dodo"],
    unemployed: false,
    job: null, // NULL for unemployed
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
  fs.writeFileSync(path.resolve("src/assets/data/", "output.docx"), buf);
}

module.exports = { compute, genDoc };
