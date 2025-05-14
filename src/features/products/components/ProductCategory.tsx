import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ProductCategoryType } from "@/types/product/productCategoryType";
import ProductCategoryAPI from "@/services/product/productCategoryAPI";
import { Box, Button, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function ProductCategory() {
    const [categories, setCategories] = useState<ProductCategoryType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {

                const res = await ProductCategoryAPI();
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
                <div key={category.id} >
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
                        {category.name}
                    </Typography>
                    <ProductList
                        products={category.products}
                        max={4}
                    />
                    <Box display="flex" justifyContent="center" p={2}>
                        <Button variant="outlined" color="primary"
                            endIcon={<NavigateNextIcon />}
                            onClick={() => window.location.href = `/category/${category.id}`}>
                            Xem thêm sản phẩm
                        </Button>
                    </Box >
                </div>
            ))}
        </Box>
    );
}