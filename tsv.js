var CSV_ARRAYS;
var CREATE_BUTTON;
var CONVERT_BUTTON;
var INIT_BUTTON;
var BUTTONS;
window.addEventListener(
    'load'
  , () => {
      getConstant();
      controlActiveButton(BUTTONS, CREATE_BUTTON);
      initializeEvent();
      receiveCSV();
      outputQuery();
    }
);

function getUniqueString(strong=1000, initialString='') {
  return initialString + new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16);
}

// よく使う要素は定数に格納
function getConstant() {
  CREATE_BUTTON = document.getElementById('create');
  CONVERT_BUTTON = document.getElementById('convert');
  INIT_BUTTON = document.getElementById('init');
  BUTTONS = [CREATE_BUTTON, CONVERT_BUTTON, INIT_BUTTON];
}

// ボタンの表示制御
function controlActiveButton(buttons, purposeNode) {
  buttons.forEach(element => {
    element.style.display = purposeNode.id == element.id ? 'inline-block' : 'none';
  });
}

function initializeEvent() {
  INIT_BUTTON.addEventListener(
      'click'
    , function(e) {
        e.stopPropagation();
        e.preventDefault();
        initialize();
      }
    , false
  );
}

function outputQuery() {
  CONVERT_BUTTON.addEventListener(
      'click'
    , function(e) {
        // insert文を作成
        e.stopPropagation();
        e.preventDefault();
        createQuery();
      }
    , false
  );
}

const receiveCSV = () => {
  CREATE_BUTTON.addEventListener(
      'click'
    , function(e) {
        // データテーブルを作成
        createTable(document.getElementById('input').value);
      }
  );
}

function initialize() {
  location.reload();
}

function autoCompleteType() {
  return;
}

function selectNull () {
  let n = createCheck('空文字はNULL変換する', 'check-null');
  return n;
}

function createCheck(desc, className) {
  let uniqueID = getUniqueString(undefined, 'check-');
  let container = document.createElement('div');
  //checkbox
  let input = document.createElement('input');
  input.className = className;
  input.id = uniqueID;
  let type = desc;
  input.type = "checkbox";

  //label
  let label = document.createElement('label');
  label.htmlFor = uniqueID;
  label.innerText = type;
  label.className = 'label-inline';

  container.appendChild(input);
  container.appendChild(label);
  return container;
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
  if (!filedata) {
    window.alert('data is null.');
    return;
  }
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
  let check = createCheck('\'\'で囲む', 'check-string');
  let nullCheck = selectNull();
  for (var i = 0; i < arrCSV.length; i++) {
    for (var j = 0; j < arrCSV[i].length; j++) {
      if (i == 1) {
        
        tmpElem = td;
        tmpElem.appendChild(check);
        tmpElem.appendChild(nullCheck);
        
        optionRow.appendChild(tmpElem);
        // initialize
        td = null;
        td = document.createElement('td');
        check = createCheck('\'\'で囲む', 'check-string');
        nullCheck = selectNull();
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
  controlActiveButton(BUTTONS, CONVERT_BUTTON);
}


function createQuery() {
  const result = document.getElementById('result');
  const tableName = document.getElementById('table-name').value;
  let columnName = CSV_ARRAYS[0].join(',');
  let datas = [];
  let checks = document.getElementsByClassName('check-string');
  let cellString = '';

  let alertMassage = '';
  alertMassage += !tableName ? 'table name is null. \n' : '';
  if (alertMassage) {
    window.alert(alertMassage);
    return
  }

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
      type = Number(checks[j].checked);

      cell = type ? `'${String(CSV_ARRAYS[i][j])}'` : CSV_ARRAYS[i][j];

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
  controlActiveButton(BUTTONS, INIT_BUTTON);
  result.style.display = 'none';
  window.alert('complete!');
}
