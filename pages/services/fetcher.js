const getPath = (pageIndex = 0) => {
  const basePath = "/api/products";
  const queryParams = [
    {
      orderReq: "random",
      categoryReq: "Shop_All",
      pageIndex: `${pageIndex}`,
      pageSize: "20",
    },
  ];
  return `${basePath}?${queryParams.join("&")}`;
};

export const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return getPath(pageIndex); // SWR key
};

export const fetcher = async (url, options = {}) => {
  const fetchOptions = {
    method: "GET",
    ...options,
  };

  try {
    const response = await fetch(url, fetchOptions);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
