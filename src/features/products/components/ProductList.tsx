
import { Box, Grid } from "@mui/material";

import Product from "./Product";
import { ProductType } from "@/types/product/productType";



export interface ProductListProps {
    products: ProductType[];
    max: number;
}

export default function ProductList({ products, max }: ProductListProps) {
    return (
        <Box sx={{ padding: 2, maxWidth: "1100px", margin: "0 auto" }}>
            <Grid container spacing={3} >
                {products.slice(0, max).map((product) => (
                    <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={product.id}>
                        <Product {...product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}