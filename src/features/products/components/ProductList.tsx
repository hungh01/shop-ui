
import { Box, Grid, Typography } from "@mui/material";

import Product from "./Product";
import { ProductType } from "@/types/product/productType";



export interface ProductListProps {
    productType: string;
    products: ProductType[];
}

export default function ProductList({ productType, products }: ProductListProps) {
    return (
        <Box sx={{ padding: 2, maxWidth: "1300px", margin: "0 auto" }}>
            {/* Category Title */}
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
                {productType}
            </Typography>
            <Grid container spacing={2} >
                {products.map((product) => (
                    <Grid size={{ xs: 3, sm: 3, md: 3, lg: 3 }} key={product.id}>
                        <Product {...product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}