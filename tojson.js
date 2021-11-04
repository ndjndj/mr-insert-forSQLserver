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
  let delimFileData = filedata.replace(/\r\n/g, '\n');
  const arrCSV = delimFileData.split('\n').map(s => s.split('\t'));
  return arrCSV;
}
