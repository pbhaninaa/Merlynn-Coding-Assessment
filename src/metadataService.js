const fetchMetadata = async (id) => {
  const url = "https://api.up2tom.com/v3/models";
  const name = "Drink choice";

  const response = await fetch(url, {
    headers: {
      Authorization: "Token 9307bfd5fa011428ff198bb37547f979",
      "Content-Type": "application/vnd.api+json",
    },
  });
  const result = await response.json();
  for (const iterator of result.data) {
    // console.log(iterator);
    if (iterator.attributes.name === name) {
      // console.log(iterator.attributes.metadata.attributes);
      return iterator;
    }
  }
};

export default fetchMetadata;