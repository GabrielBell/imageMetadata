var express= require('express'),
router= express.Router(), 
request=require('request'), 
multer= require('multer'), 
path=require('path')

//specify directory and naming convention
var storage=multer.diskStorage({
	filename: function(req,file,cb){
		// add check to ensure . in filename
		var name= file.originalname.split('.')[0];
		var ext= file.originalname.split('.')[1];
		cb(null, name+'_'+ Date.now().toString().slice(-2)+'.'+ext)
	},
	destination: function(req,file,cb){
		cb(null, path.join(__dirname,'../public/uploads/'))
	}
})
//options: dest, fileFilter(), limits, preservePath
var uploading= multer({
	storage: storage ,
	limits: {fileSize: 1000000, files:1}
})
//logger
router.use(function timeLog(req,res,next){
	console.log('Time: ', Date.now(), req.method,'\n');
	next()
});

router.post('/', uploading.single('displayImage'), function(req,res){
		console.log(req.file);
		res.status(200);
		res.render('upload', {metadata: req.file});

});

router.get('/:filename', function(req,res){
	console.log("request made for ", req.params.filename)
	res.sendFile(path.join(__dirname,'../public/uploads/', req.params.filename))
})


module.exports = router;

//var ext= '.'+req.file.mimetype.substr(req.file.mimetype.lastIndexOf('/')+1);
//console.log('file extension= ', ext)