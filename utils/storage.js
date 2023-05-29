const multer = require('multer'); // untuk media handling
const path = require('path'); // untuk mendapatkan file extension

const storage = multer.diskStorage({

  // direktori tujuan penyimpanan media
  destination: (req, file, callback) => {
    callback(null, './public/images');
  },

  // konfigurasi penamaan file nya
  filename: (req, file, callback) => {
    const fileName = Date.now() + path.extname(file.originalname);
    callback(null, fileName);
  }
});

module.exports = {
  image: multer({
    storage: storage,

    // add file filter
    fileFilter: (req, file, callback) => {
      if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {

        // izinkan upoad
        callback(null, true);
      } else {

        // return error
        const err = new Error('Only png, jpg or jpeg to allowed for upload!');
        callback(err, false);
      }
    },

    onError: (err) => {
      throw (err);
    }
  })
};