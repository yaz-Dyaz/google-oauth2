const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const storage = require('../utils/storage');

const middlewares = require('../utils/middlewares');

router.post('/auth/register', user.register);
router.post('/auth/login', user.login);
router.get('/auth/whoami', middlewares.auth, user.whoami);
router.get('/auth/oauth', user.googleOauth2);

router.post('/storage/images', storage.image.single('media'), (req, res) => {
  // ex = http://localhost:3000/images/...
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

  return res.status(200).json({
    status: true,
    message: 'success',
    data: {
      image_url: imageUrl
    }
  })
});

router.post('/storage/multi/images', storage.image.array('media'), (req, res) => {
  const imageUrls = [];
  req.files.forEach(file => {
    imageUrls.push(`${req.protocol}://${req.get('host')}/images/${file.filename}`);
  });

  return res.status(200).json({
    status: true,
    message: 'success',
    data: {
      image_url: imageUrls
    }
  })
});


module.exports = router;