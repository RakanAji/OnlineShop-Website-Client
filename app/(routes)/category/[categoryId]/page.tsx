import getCategories from "@/actions/get-categories";
import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { JSX } from "react";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

// Komponen halaman kategori yang menggunakan pola baru untuk params
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<JSX.Element> {
  // Await params terlebih dahulu untuk mendapatkan objek parameter yang sebenarnya
  const resolvedParams = await params;

  // Ambil produk dan kategori berdasarkan categoryId
  const products = await getProducts({ categoryId: resolvedParams.categoryId });
  const category = await getCategory(resolvedParams.categoryId);

  return (
    <div className=" bg-white">
      <Container>
        <Banner data={category.banner} />
        <div className=" px-4 sm:px-6 lg:px-8 pb-24">
          <div className=" mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
