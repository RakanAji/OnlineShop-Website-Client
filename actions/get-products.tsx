import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch products");

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return array kosong jika gagal
  }
};

export default getProducts;
