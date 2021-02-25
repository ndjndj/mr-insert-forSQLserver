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
       
      }
  );


}

function previewFile(file) {
  let fr = new FileReader();
  fr.readAsDataURL(file);
  fr.onload = function() {
    console.log(fr.result);
  }
}

main();
