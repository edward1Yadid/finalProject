export const normalizedproduct=(product)=>({

    title:product.title,
    description:product.description,
    price:product.price,
    color:product.color,
    category:product.category,
    subcategory:product.subcategory,
    image: {
        url: product.url,
        alt: product.alt
    },
    gender:product.gender,
    discount:product.discount

})








