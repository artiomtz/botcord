const config = require("./config");
const axios = require("axios");

async function fetchData() {
  const apis = JSON.parse(config.apis);
  const selectedApiIndex = Math.floor(Math.random() * apis.length);
  const selectedApi = apis[selectedApiIndex];
  console.log(`☑️ Fetching data from ${selectedApi.url}`);

  try {
    const response = await axios.get(
      selectedApi.key
        ? `${selectedApi.url}&${selectedApi.key}`
        : selectedApi.url
    );
    const data = extractData(response.data, selectedApi.field);

    if (data) {
      console.log(`✅ Fetched data: ${data}`);
      return data;
    } else {
      console.error("❌ Failed to extract data from the API response.");
      return null;
    }
  } catch (error) {
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
