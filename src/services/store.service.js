var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.imagekit_publicKey,
  privateKey: process.env.imagekit_privateKey,
  urlEndpoint: process.env.imagekit_urlEndpoint,
});

 async function uploadFile(file, fileName) {
   const result =  await imagekit.upload({
         file,
         fileName,
   });
     
     return result;
};

module.exports = uploadFile