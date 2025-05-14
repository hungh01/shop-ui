import ProductCategory from "@/features/products/components/ProductCategory";
import ImageSlider from "@/features/promotion/ImageSlider";


const images = [
    "/promotion-image/1.webp",
    "/promotion-image/2.webp",
    "/promotion-image/3.jpg",
];
export default function Home() {
    return (
        <>
            <ImageSlider images={images} />
            <ProductCategory />
        </>
    );
};

