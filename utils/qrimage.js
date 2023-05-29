const qr = require('qr-image');
const imagekit = require('./imagekit');

module.exports = async (text, ecLevel = 'M') => {
  return new Promise(async (resolve, reject) => {
    try {
      const qrBuffer = await qr.imageSync(text, ecLevel);
      const qrString = qrBuffer.toString('base64');

      const qrFile = await imagekit.upload({
        fileName: text,
        file: qrString
      });

      resolve(qrFile);
    } catch (err) {
      reject(err);
    }
  });
}
