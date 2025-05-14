import ProductList from "./ProductList";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getProductByCategory from "@/services/product/getProductByCategory";
import { useParams } from "react-router-dom";
import { ProductType } from "@/types/product/productType";

const LIMIT = 8;

export default function ProductsByCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProductByCategory(categoryId as string, page, LIMIT);
                setProducts(res.paginatedProducts);
                setTotal(res.totalProducts); // Make sure your API returns total count
            } catch (err: any) {
                console.log("Error loading products:", err.message);
            }
        };
        if (categoryId) {
            fetchProducts();
        }
    }, [categoryId, page]);

    const totalPages = Math.ceil(total / LIMIT);

    return (
        <Box
            sx={{
                padding: 5,
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                paddingTop: 10,
            }}
        >

            <ProductList products={products} max={total} />

            {(
                <Stack spacing={2} alignItems="center" mt={4}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_e, value) => setPage(value)}
                        color="primary"
                        shape="rounded"
                    />
                </Stack>
            )}
        </Box>
    );
}
