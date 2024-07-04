const normalizeProductRaw = (productData) => {
  const {
    image: { url, alt },
  } = productData;

  const normalizedProduct = {
    ...productData,
    image: {
      ...productData.image,
      url:
        url ||
        "https://i.im.ge/2024/05/05/ZRdTdD.errorphtoimage.jpeg",
      alt: alt || "Product Image"},
      title: productData.title.trim(),
      category:productData.category.trim(),
      description: productData.description.trim(),
      price: parseFloat(productData.price),
      discount: parseFloat(productData.discount),
    }



  return normalizedProduct;
};
exports.normalizeProductRaw = normalizeProductRaw;
