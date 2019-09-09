const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//For PDF Document
var PDFDocument = require('pdfkit');
var fs = require('fs');

// create our Express app
const app = express();

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())

//Sample API
app.get('/hello',(req,res) => {
	res.send("Hello there");
})

//convert image to pdf
app.get('/convertPdftoImg', async(req,res) => {
	let doc = new PDFDocument;
	//Pipe its output somewhere, like to a file or HTTP response 
	//See below for browser usage
	doc.pipe(fs.createWriteStream('output.pdf'))
	//Add an image, constrain it to a given size, and center it vertically and horizontally 
	doc.image('./test.jpg', {
   		fit: [500, 400],
   		align: 'center',
   		valign: 'center'
	});

	doc.addPage()
   	   .image('./test1.jpg', {
   			fit: [500,400],
   			align: 'center',
   			valign: 'center'
	});

	doc.end()

});

module.exports = app;
