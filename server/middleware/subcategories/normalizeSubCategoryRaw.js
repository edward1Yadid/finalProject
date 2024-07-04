
const {generateSubCategoryIDnumber}=require("./generateSubCategoryIDnumber")

const normalizeSubCategoryRaw = async (rawSubCategory) => {
  const {
    image: { url, alt },
  } = rawSubCategory;

  const normalizedSubCategory = {
    ...rawSubCategory,
    name: rawSubCategory.name || "",
    image: {
      ...rawSubCategory.image,
      url: url || "https://i.im.ge/2024/05/05/ZRdTdD.errorphtoimage.jpeg",
      alt: alt || "SubCategory image",
  
    },
    subcategory_id: await generateSubCategoryIDnumber(),
  };

  return normalizedSubCategory;
};


exports.normalizeSubCategoryRaw=normalizeSubCategoryRaw