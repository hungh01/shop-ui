import { Button, TextField, IconButton, Paper, Table, TableHead, TableBody, TableRow, TableCell, Pagination, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";

import getProducts from "@/services/admin/getProducts";
import { API_URL } from "@/utils/api";
import { ProductType } from "../type/productType";
import ProductCategoryAPI from "@/services/product/productCategoryAPI";
import deleteProduct from "@/services/admin/deleteProduct";

interface ProductAdmin {
    page: number;
    pageLimit: number;
    totalPages: number;
    totalProducts: number;
    paginatedProducts: ProductType[];
}
interface Category {
    id: number;
    name: string;
}

export default function Management() {
    const [productName, setProductName] = useState<string>("");
    const [productCategoryName, setProductCategoryName] = useState<string>("");
    const [stock, setStock] = useState<number>(-1);
    const [result, setResult] = useState<ProductAdmin>({} as ProductAdmin);
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState<Category[]>([]);
    const fetchProducts = useCallback(async () => {
        try {
            const data = await getProducts(productName, productCategoryName, stock, page);
            setResult(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [productName, productCategoryName, stock, page]);
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await ProductCategoryAPI();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id.toString());
            setResult((prev) => ({
                ...prev,
                paginatedProducts: prev.paginatedProducts.filter((product) => product.id !== id),
            }));
            alert("Xóa sản phẩm thành công");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Xóa sản phẩm thất bại");
        }
    };
    return (
        <div className="p-6 space-y-6 pt-20">
            {/* Nút thêm sản phẩm */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => {
                        window.location.href = "/admin/addproduct";
                    }}
                >
                    Thêm sản phẩm
                </Button>
            </div>


            {/* Danh sách sản phẩm */}
            <Paper elevation={3}>
                <Table>
                    <TableHead className="bg-gray-100">
                        <TableRow>
                            <TableCell>
                                <strong>Ảnh</strong>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <strong className="text-sm whitespace-nowrap">Tên sản phẩm</strong>
                                    <TextField
                                        onChange={(e) => setProductName(e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        placeholder="Tìm kiếm"
                                        //className="w-44"
                                        fullWidth
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <FormControl size="small" className="w-44">
                                    <InputLabel id="category-select-label">Danh mục</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        value={productCategoryName}
                                        label="Danh mục"
                                        onChange={(e) => setProductCategoryName(e.target.value)}
                                    >
                                        <MenuItem value="">Tất cả</MenuItem>
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.name}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell><strong>Giá</strong></TableCell>
                            <TableCell
                                onClick={() => setStock(prev => (prev === 0 ? -1 : 0))}
                                className="cursor-pointer select-none"
                            >
                                <strong className="text-sm">
                                    Tồn kho {stock === 0 ? "(Đang lọc: hết hàng)" : ""}
                                </strong>
                            </TableCell>
                            <TableCell align="right"><strong>Hành động</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* sản phẩm */}
                        {result.paginatedProducts && result.paginatedProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img src={API_URL + product.image} alt="product" className="w-12 h-12 object-cover rounded" />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>{product.price.toLocaleString()} ₫</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell align="right">
                                    <div className="flex justify-end gap-2">
                                        <IconButton color="primary" component='a' href={`/admin/updateproduct/${product.id}`} >
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(product.id)}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                    <Pagination
                        count={result.totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </div>
            </Paper>
        </div>
    );
}
