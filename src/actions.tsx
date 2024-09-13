export const getDataApi = async (skip?: number) => {
  const res = await fetch(
    `https://dummyjson.com/products?limit=6&skip=${skip}&select=title,price,description,thumbnail`
  );
  return await res.json();
};

export const getCategoriesApi = async () => {
  const res = await fetch("https://dummyjson.com/products/categories");
  return await res.json();
};
