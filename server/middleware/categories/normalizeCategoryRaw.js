const { generateCategoryIDnumber } = require("./generateCategoryIDnumber");

const normalizeCategoryRaw = async (rawCategory) => {
  const {
    image: { url, alt },
  } = rawCategory;

  const normalizedCategory = {
    ...rawCategory,
    name: rawCategory.name || "",
    image: {
      ...rawCategory.image,
      url: url || "https://i.im.ge/2024/05/05/ZRdTdD.errorphtoimage.jpeg",
      alt: alt || "Category image",
  
    },
    category_id: await generateCategoryIDnumber(),
  };

  return normalizedCategory;
};


module.exports = {
  normalizeCategoryRaw: normalizeCategoryRaw,
};
