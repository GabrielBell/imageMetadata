var express= require('express');
var app= express();

var fileUpload= require('./routes/fileUpload');
// var upload= multer()
//upload.single('filename') => req.file is filename, req.body will hold text fields
//upload.array('photos', 12) => req.files is array of 'photos' files, req.body will hold text files
var port = process.env.PORT || 8080;
app.set('views', './views');
app.set('view engine', 'pug');



app.use('/pictures/upload', fileUpload);

app.get('/', function(req,res){
	res.render('index')
});


app.listen(port, function(){
	console.log('listening on port '+port);
	
});