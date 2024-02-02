const axios = require("axios");
const config = require("./config");

async function fetchData() {
  try {
    let data = null;
    if (Math.random() < config.apiOverImage) {
      const apis = JSON.parse(config.apiPosts);
      const selectedApiIndex = Math.floor(Math.random() * apis.length);
      const selectedApi = apis[selectedApiIndex];

      config.env === "dev"
        ? console.log(`☑️ Fetching data from API: ${selectedApi.url}`)
        : console.log("☑️ Fetching data from API.");

      const response = await axios.get(selectedApi.url);
      if (response.status != 200) {
        console.error("❌ API call failed.");
        return null;
      }
      data = extractData(response.data, selectedApi.field);
    } else {
      const images = JSON.parse(config.imagesPosts);
      const isPic = Math.random() < config.picOverCdn;

      if (isPic) {
        console.log("☑️ Fetching an image.");
        const pic = images["pic"];
        const response = await axios.get(pic.url);
        if (response.status != 200) {
          console.error("❌ API call failed.");
          return null;
        }
        data = {
          content: response.data[pic["caption"]],
          files: [
            {
              attachment: response.data[pic["field"]],
              name: config.cdnPhotoName + ".jpg",
            },
          ],
        };
      } else {
        console.log("☑️ Fetching data from CDN.");
        const selectedCdnIndex = Math.floor(
          Math.random() * config.cdnNumImages
        );
        const cdnImage = images["cdn"] + selectedCdnIndex;
        data = {
          content: "",
          files: [
            {
              attachment: cdnImage,
              name: config.cdnPhotoName + ".jpg",
            },
          ],
        };
      }
    }

    if (data) {
      typeof data === "string"
        ? console.log(`✅ Fetched data:\n${data}`)
        : console.log("✅ Data is ready to be posted.");
      return data;
    } else {
      console.error("❌ Failed to extract data from the API response.");
      return null;
    }
  } catch {
    console.error("⛔ Error fetching posts.");
  }
}

function extractData(responseData, field) {
  const fieldParts = field.split(",");

  for (const part of fieldParts) {
    if (part.includes(":")) {
      const parts = part.split(":");
      const concatenatedData = parts
        .map((part) => responseData[part])
        .filter((data) => data)
        .join("\n");
      if (concatenatedData) {
        return concatenatedData;
      }
    } else {
      const data = responseData[part];
      if (data) {
        return data;
      }
    }
  }
  return null;
}

module.exports = {
  fetchData,
};
