import { Category } from "@/types";

const URL = `${process.env.PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(URL, { cache: "no-store" }); // Pastikan fresh data
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return array kosong jika gagal
  }
};

export default getCategories;
