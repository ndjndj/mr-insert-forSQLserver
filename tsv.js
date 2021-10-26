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
  const convertButton = document.getElementById('convert');
  convertButton.addEventListener(
      'click'
    , function(e) {
        e.stopPropagation();
        e.preventDefault();
        createQuery();
      }
    , false
  );
}

const receiveCSV = () => {

  const createButton = document.getElementById('create');
  createButton.addEventListener(
      'click'
    , function(e) {
        const fileInput = document.getElementById('input');
        createTable(fileInput.value);
      }
  );
}

function initialize() {
  const input = document.getElementById('input');
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
  let delimFileData = filedata.replace(/\r\n/g, '\n');
  const arrCSV = delimFileData.split('\n').map(s => s.split('\t'));
  CSV_ARRAYS = arrCSV;
  const result = document.getElementById('result');

  let table = document.createElement('table');
  let tmpRow = document.createElement('tr');
  let tmpElem;
  let th = document.createElement('th');
  let td = document.createElement('td');
  let optionRow = document.createElement('tr');
  let select = createSelect();
  for (var i = 0; i < arrCSV.length; i++) {
    for (var j = 0; j < arrCSV[i].length; j++) {
      if (i == 1) {
        select.id = String(j);

        tmpElem = td;
        tmpElem.appendChild(select);
        optionRow.appendChild(tmpElem);
        // initialize
        td = null;
        td = document.createElement('td');
        select = createSelect();
      }

      tmpElem = i == 0 ? th : td;
      tmpElem.innerText = arrCSV[i][j];
      tmpRow.appendChild(tmpElem);

      // initialize
      th = null;
      td = null;
      th = document.createElement('th');
      td = document.createElement('td');
    }

    if(i==1) {
      table.appendChild(optionRow);
    }
    table.appendChild(tmpRow);
    tmpRow = null;
    tmpRow = document.createElement('tr');
  }

  result.appendChild(table);

}


function createQuery() {
  const result = document.getElementById('result');
  const tableName = document.getElementById('table-name').value;
  let columnName = CSV_ARRAYS[0].join(',');
  let datas = [];
  let selects = document.getElementsByClassName('select');
  let cellString = '';

  var tmpArr = [];
  var type;
  var cell;
  for (var i = 1; i < CSV_ARRAYS.length; i++) {
    // 最終行に改行が入っている場合
    console.log(CSV_ARRAYS[i]);
    if (i == CSV_ARRAYS.length - 1 && CSV_ARRAYS[i].length == 1 && CSV_ARRAYS[i] == '') {
      continue;
    }
    for (var j = 0; j < CSV_ARRAYS[i].length; j++) {
      type = Number(selects[j].value);

      switch(type) {
        case 0:
          cell = CSV_ARRAYS[i][j];
          break;
        case 1:
          cell = `'${String(CSV_ARRAYS[i][j])}'`;
          break;
        default:
          break;
      }
      cell = cell == '' ? 'NULL' : cell;

      tmpArr.push(cell);
    }
    datas.push(tmpArr);
    tmpArr = [];
  }

  for (var i = 0; i < datas.length; i++) {
    cellString += i == 0 ? `    (${datas[i].join(',')})\n` : `  , (${datas[i].join(',')})\n`;
  }

  const query = `
    INSERT INTO ${tableName}(${columnName}) VALUES \n
    ${cellString}
  `;

  document.getElementById('query').value = query;
  result.style.display = 'none';
  window.alert('complete!');
}

main();
