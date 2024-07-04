const normalizeProductRawEdit = (productData) => {

    const normalizedProductEdit = {
      ...productData,
        title: productData.title.trim(),
        color: productData.color.trim(),
        description: productData.description.trim(),
        price: parseFloat(productData.price),
        discount: parseFloat(productData.discount),
     

    };
    return normalizedProductEdit;
  };
  exports.normalizeProductRawEdit = normalizeProductRawEdit;
  