const cloudinary = require("cloudinary").v2;
const config = require("./config");
const fs = require("fs/promises");
const path = require("path");

cloudinary.config({
  cloud_name: config.cdnCloudName,
  api_key: config.cdnApiKey,
  api_secret: config.cdnApiSecret,
});

async function uploadImages() {
  try {
    const files = await fs.readdir(config.cdnLocalDir);

    for (let i = 0; i < files.length; i++) {
      const localFilePath = path.join(config.cdnLocalDir, files[i]);
      const cdnURL = `https://res.cloudinary.com/${
        config.cdnCloudName
      }/image/upload/${config.cdnDir}/photo${i + 1}`;

      try {
        await cloudinary.uploader.upload(localFilePath, {
          public_id: `${config.cdnDir}/photo${i + 1}`,
        });

        console.log(`Image ${i + 1} uploaded to CDN. URL: ${cdnURL}`);
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Error reading local directory:", error.message);
  }
}

uploadImages();
