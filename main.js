const main = () => {
    //
    window.addEventListener(
        'load'
      , () => {
          receiveCSV();
        }
    );

}

const receiveCSV = () => {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');

  dropZone.addEventListener(
      'dragover'
    , function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.style.background = '#e1e7f0'
      }
    , false
  );

  dropZone.addEventListener(
      'dragleave'
    , function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.style.background = '#ffffff'
      }
    , false
  );

  dropZone.addEventListener(
      'drop'
    , function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.style.background = '#ffffff'
        let files = e.dataTransfer.files;
        if (files.length > 1) { return alert('アップロードできるファイルは1つだけです。'); }
        fileInput.files = files;
        previewFile(files[0]);
      }
    , false
  );

  fileInput.addEventListener(
      'change'
    , function() {
      previewFile(this.files[0]);
      }
  );
}

function previewFile(file) {
  let fr = new FileReader();
  fr.readAsText(file);
  fr.onload = function(e) {
    console.log(e.target.result);
    createTable(e.target.result);
  }
}

function createTable(filedata) {
  const arrCSV = filedata.split('\n').map(s => s.split(','));

  const result = document.getElementById('result');

  let table = document.createElement('table');
  let tmpRow = document.createElement('tr');
  let tmpElem;
  let th = document.createElement('th');
  let td = document.createElement('td');
  for (var i = 0; i < arrCSV.length; i++) {
    for (var j = 0; j < arrCSV[i].length; j++) {
      tmpElem = i == 0 ? th : td;
      console.log(arrCSV[i][j]);
      tmpElem.innerText = arrCSV[i][j];
      tmpRow.appendChild(tmpElem);

      // initialize
      th = null;
      td = null;
      th = document.createElement('th');
      td = document.createElement('td');
    }

    table.appendChild(tmpRow);
    tmpRow = null;
    tmpRow = document.createElement('tr');
  }

  result.appendChild(table);

}

main();
