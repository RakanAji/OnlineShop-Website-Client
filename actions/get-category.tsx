import { Category } from "@/types";

const URL = `${process.env.PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const response = await fetch(`${URL}/${id}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Category not found");
    return response.json();
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null; // Return null jika kategori tidak ditemukan
  }
};

export default getCategory;
