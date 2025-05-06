import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ProductCategoryType } from "@/types/product/productCategoryType";
import ProductCategoryAPI from "@/services/product/productCategoryAPI";
import { Box } from "@mui/material";

export default function ProductCategory() {
    const [categories, setCategories] = useState<ProductCategoryType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {

                const res = await ProductCategoryAPI();
                console.log("res", res);
                setCategories(res);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchCategories();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box
            sx={{
                padding: 5,
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",

            }}
        >
            {categories.map((category: ProductCategoryType) => (
                <ProductList
                    key={category.id}
                    productType={category.name}
                    products={category.products}
                />
            ))}
        </Box>
    );
}