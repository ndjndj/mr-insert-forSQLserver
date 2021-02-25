var CSV_ARRAYS;

const main = () => {
    window.addEventListener(
        'load'
      , () => {
          receiveCSV();
          outputQuery();
        }
    );

}

function outputQuery() {
  const createButton = document.getElementById('create');
  createButton.addEventListener(
      'onClick'
    , function(e) {
        e.stopPropagation();
        e.preventDefault();
        createQuery();
      }
    , false
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
    initialize();
    createTable(e.target.result);
  }
}

function initialize() {
  const input = document.getElementById('file-input');
  const table = document.getElementById('result');
  input.value = null;
  table.innerHTML = '';
}

function createSelect() {
  let select = document.createElement('select');
  let option = document.createElement('option');
  select.className = 'select';
  let types = ['\'\'で囲まない', '\'\'で囲む'];
  for (var i = 0; i < types.length; i++) {
    option.value = i;
    option.innerText = types[i];
    select.appendChild(option);
    option = document.createElement('option');
  }
  return select;
}

function createTable(filedata) {
  const arrCSV = filedata.split('\n').map(s => s.split(','));
  CSV_ARRAYS = arrCSV;
  const result = document.getElementById('result');

  let table = document.createElement('table');
  let tmpRow = document.createElement('tr');
  let tmpElem;
  let th = document.createElement('th');
  let td = document.createElement('td');
  let select = createSelect();
  for (var i = 0; i < arrCSV.length; i++) {
    for (var j = 0; j < arrCSV[i].length; j++) {
      if (i == 0) {
        select.id = String(j);
        result.appendChild(select);
        select = createSelect();
        console.log(j);
      }

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



function createQuery() {
  const tableName = document.getElementById('table-name').value;
  let columnNames = [];
  let datas = [];
  let selects = [];

  const query = `
    INSERT INTO ${tableName}() VALUES
        ()
      , ()
      , ()
  `;
  console.log(query);
}



main();
