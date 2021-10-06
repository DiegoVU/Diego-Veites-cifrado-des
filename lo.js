function cifraDes(){
    let txt = document.getElementById("txtDes").value
    console.log("Texto en DES: "+txt);
    //Recuperamos el contenido del texto
    
    let claveDes = document.getElementById("clavedes").value;
    if(claveDes.length != 8){
        alert("Clave de 8 caracteres");
        return false;
    }
    //Recuperamos la clave
    let cifra =  CryptoJS.DES.encrypt(txt,claveDes);
    //encriprtamos con la libreria Crypto junto con la clave
    
    descargarArchivo(generarTexto(cifra), 'CifradoDES.txt');
    //llamamos al metodo descargar archivo
}

function descifraDes(){
    let cifrado = document.getElementById("txtDes").value;
    console.log("Cifrado en DES: "+cifrado);


    let claveDes = document.getElementById("clavedes").value;
    if(claveDes.length != 8){
        alert("Clave de 8 caracteres");
        return false;
    }

    let desci = CryptoJS.DES.decrypt(cifrado,claveDes);
    desci = desci.toString(CryptoJS.enc.Utf8);
    descargarArchivo(generarTexto(desci), 'DescifradoDES.txt');  
    //solo va a cambiar 
}


function leerdes(){
    let archivodes = document.getElementById("archivodes").files[0];

    let readerDes = new FileReader();
    readerDes.onload = function(fileLoadedEvent){
        let txtDes = fileLoadedEvent.target.result;
        document.getElementById("txtDes").value = txtDes;
    };

    readerDes.readAsText(archivodes, "UTF-8");
    //recuperamos el contenido del .txt
    
}




function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    //nos piden los argumentos
    
    var reader = new FileReader();
    //vamos a tener un reader
    
    reader.onload = function (event) {
      
      var save = document.createElement('a');
      save.href = event.target.result;
      save.target = '_blank';
      //la variable que nos sirve para crear el elemento
      
      save.download = nombreArchivo || 'CifradoDes.txt'; //el nombre del archivo
      var clicEvent = new MouseEvent('click', {          // se genera con el click
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      
      save.dispatchEvent(clicEvent);
      
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    
    reader.readAsDataURL(contenidoEnBlob);
    //conseguimos recuperor el contenido del archivo cifrado
  };


function generarTexto(datos) {
let texto = [];
texto.push(datos);


return new Blob(texto, {
    type: 'text/plain'
});
};