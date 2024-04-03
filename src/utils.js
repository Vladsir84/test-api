const baseUrlIds = "/backend/api/catalog/getFiltersAndGoods/168831";

export const getGoodsIds = async () =>
  await fetch(baseUrlIds, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

export const getGoods = async (good_id) =>
  await fetch(`/backend/api/goods/id/${good_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
