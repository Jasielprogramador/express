// getElementById
function $id(id) {
    return document.getElementById(id);
}


// output information
function output(msg) {
	const m = $id("messages");
	m.innerHTML = msg + m.innerHTML;
}


// file drag hover
function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
}


// file selection
function fileSelectHandler(e) {

    // cancel event and hover styling
    fileDragHover(e);

    // fetch FileList object
	const files = e.target.files || e.dataTransfer.files;

	if (e.constructor.name !== "DragEvent") {
        // process all File objects
        for (var i = 0, f; f = files[i]; i++) {
            parseFile(f);
        }
    }

    // files can be added by drag&drop or clicking on form's button
    // if the later, append files to form files field
	const formFiles = $id("upload").fileselect;
	if (formFiles.files.length === 0) {
        formFiles.files = files;
    }


}


// output file information
function parseFile(file) {

    output(
        "<p>Datos del fichero: <strong>" + file.name +
        "</strong> Tipo: <strong>" + file.type +
        "</strong> Tamaño: <strong>" + file.size +
        "</strong> bytes</p>"
    );

}


function enviar() {
    // debes devolver una función que recoja los datos de submitform usando FormData y haga una
    // petición post (usando el Fetch API) con dichos datos a /pedido/add 
    //  El resultado debes tratarlo como un objeto JSON y mostrarlo por pantalla. En concreto la respuesta
    // JSON debe contener las rutas a los ficheros subidos al servidor (al hacer click sobre ellas deben
    // abrirse los ficheros) y los valores del resto de campos
    // HINT: https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api


}

// initialize
function init() {

	const fileselect = $id("fileselect"),
		filedrag = $id("filedrag"),
		submitbutton = $id("enviar");


	submitbutton.onclick = enviar;


    // file select
    fileselect.addEventListener("change", fileSelectHandler, false);


    // file drop
    filedrag.addEventListener("dragover", fileDragHover, false);
    filedrag.addEventListener("dragleave", fileDragHover, false);
    filedrag.addEventListener("drop", fileSelectHandler, false);
    filedrag.style.display = "block";

}

// call initialization file
if (window.File && window.FileList) {
    init();
}

