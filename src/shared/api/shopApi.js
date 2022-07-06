const shopList = [
  {
    id: 1,
    name: "burger",
    icon: "",
    products: [
      { id: 1, name: "burger1", image: "", price: 33 },
      { id: 2, name: "burger2", image: "", price: 28 },
      { id: 3, name: "burger3", image: "", price: 44 },
      { id: 4, name: "burger4", image: "", price: 74 },
      { id: 5, name: "burger5", image: "", price: 14 },
    ],
  },
  {
    id: 2,
    name: "pizza",
    icon: "",
    products: [
      { id: 1, name: "pizza", image: "", price: 33 },
      { id: 2, name: "pizza2", image: "", price: 28 },
      { id: 3, name: "pizza3", image: "", price: 44 },
    ],
  },
  {
    id: 3,
    name: "kfc",
    icon: "",
    products: [
      { id: 1, name: "kfc", image: "", price: 33 },
      { id: 2, name: "kfc2", image: "", price: 28 },
      { id: 3, name: "kfc3", image: "", price: 44 },
    ],
  },
  {
    id: 4,
    name: "coffee",
    icon: "",
    products: [
      { id: 1, name: "coffee", image: "", price: 33 },
      { id: 2, name: "coffee2", image: "", price: 28 },
      { id: 3, name: "coffee3", image: "", price: 44 },
    ],
  },
  {
    id: 5,
    name: "hesburger",
    icon: "",
    products: [
      { id: 1, name: "hesburger1", image: "", price: 33 },
      { id: 2, name: "hesburger2", image: "", price: 28 },
      { id: 3, name: "hesburger3", image: "", price: 44 },
    ],
  },
];

export const getShopList = async () => {
  const result = await new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(shopList);
    }, 200);
  });
  console.log(result);
  return result;
};