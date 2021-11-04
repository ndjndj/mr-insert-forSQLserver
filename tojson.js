const main = () => {
  window.addEventListener(
      'load'
    , () => {

    }
  );
}

function initialize() {
  document.getElementById('input').value = null;
  document.getElementById('json').value = null;
}

function loadTSV() {
  const tsv = document.getElementById('input').value;
  let delimFileData = tsv.replace(/\r\n/g, '\n');
  const arrCSV = delimFileData.split('\n').map(s => s.split('\t'));
  return arrCSV;
}

function tsvToJson() {
  const arrCSV = loadTSV();
  const toJson = {};
  let cmpcd = '';
  for (var i=0; i < arrCSV.length; i++) {
    cmpcd = String(arrCSV[i][0]);
    toJson[cmpcd] = {};
    toJson[cmpcd]['cmpnm'] = String(arrCSV[i][1]);
    toJson[cmpcd]['pnm'] = String(arrCSV[i][2]);
    toJson[cmpcd]['paddress'] = String(arrCSV[i][3]);
  }
  return toJson
}

function updateJsonArea(json) {
  const jsonArea = document.getElementById('json');
  const stringifyJson = JSON.stringify(json);
  jsonArea.value = stringifyJson;
}
