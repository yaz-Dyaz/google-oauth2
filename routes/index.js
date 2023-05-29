const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const storage = require('../utils/storage');
const media = require('../controllers/media');
const qr = require('../utils/qrimage');
const multer = require('multer')();

const middlewares = require('../utils/middlewares');
const qrimage = require('../utils/qrimage');

router.post('/auth/register', user.register);
router.post('/auth/login', user.login);
router.get('/auth/whoami', middlewares.auth, user.whoami);
router.get('/auth/oauth', user.googleOauth2);

router.post('/storage/images', storage.image.single('media'), media.storageSingle);
router.post('/storage/multi/images', storage.image.array('media'), media.storageArray);
router.post('/imagekit/upload', multer.single('media'), media.imagekitUpload);

router.get('/test/qr', async (req, res) => {
  try {
    const data = await qrimage('https://instagram.com/yaaaz.a');
    return res.status(200).json(data);
  } catch (err) {
    throw err;
  }
})

module.exports = router;