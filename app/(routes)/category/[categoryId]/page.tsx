import getCategories from "@/actions/get-categories";
import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

interface CategoryPageProps{
    params: {
        categoryId: string
    }
}

export async function generateStaticParams() {
  // Jika Anda memiliki daftar kategori, dapatkan semua ID kategori untuk pre-rendering
  // Contoh: Ambil daftar kategori dari API atau database
  const categories = await getCategories(); // Anda perlu buat fungsi getCategories()
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProducts({ categoryId: params.categoryId });
  const category = await getCategory(params.categoryId);

  return (
    <div className=" bg-white">
      <Container>
        {category && <Banner data={category.banner} />}
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
 