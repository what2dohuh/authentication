const multer = require('multer');

const storage  = multer.diskStorage({
    filename: function(req, file,cb){
        cb(null,file.fieldname + '-' + Date.now() )
    }
})

const upload = multer({storage: storage})

module.exports = upload