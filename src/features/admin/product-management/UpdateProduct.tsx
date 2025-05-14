import { useEffect, useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    Typography,
    FormControl,
    InputLabel,
    TextField,
} from "@mui/material";

import { API_URL } from "@/utils/api";
import AlertBox from "@/components/notification/Alert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
interface ProductOption {
    id: number;
    name: string;
    categoryId: number;
}

export default function UpdateProduct() {
    const id = window.location.pathname.split("/").pop();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const handleAlert = (msg: string, sev: 'success' | 'error' | 'warning' | 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };


    const [productTypes, setProductTypes] = useState<ProductOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | null>(null);
    const [stock, setStock] = useState<number | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [newImage, setNewImage] = useState<File | null>(null);

    useEffect(() => {
        async function fetchProductOptions() {
            try {
                const response = await fetch(`${API_URL}/categories`);
                const data: ProductOption[] = await response.json();
                setProductTypes(data);
            } catch (error) {
                console.error("Error fetching product options:", error);
            }
        }

        fetchProductOptions();
    }, []);

    useEffect(() => {
        async function fetchProductDetail() {
            try {
                const response = await fetch(`${API_URL}/products/${id}`);
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setStock(data.stock);
                setImage(data.image);
                setSelectedOption(data.categoryId);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        }

        fetchProductDetail();
    }, [id]);

    const handleUpdateProduct = async () => {
        if (
            selectedOption === null ||
            !name ||
            !description ||
            price === null ||
            stock === null
        ) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("stock", stock.toString());
        if (newImage) {
            formData.append("image", newImage as File);
        } else {
            formData.append("image", image as string);
        }
        formData.append("categoryId", selectedOption.toString());
        console.log("FormData:", formData);
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: "POST",
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                handleAlert("Cập nhật thành công!", 'success');
                setName("");
                setDescription("");
                setPrice(null);
                setStock(null);
                setImage(null);
                setSelectedOption(null);
                window.location.href = "/admin/management";
            } else {
                handleAlert("Cập nhật thất bại.", 'error');
            }
        } catch (error) {
            handleAlert("Cập nhật thất bại.", 'error');
            console.error("Error adding product:", error);
        }
    };

    return (
        <>
            <AlertBox setOpen={setOpen} open={open} severity={severity} message={message} />
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This is the dashboard page.
                </Typography>

                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Add Product
                    </Typography>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="product-option-label">Product Type</InputLabel>
                        <Select
                            labelId="product-option-label"
                            value={selectedOption ?? ""}
                            onChange={(e) => setSelectedOption(Number(e.target.value))}
                            label="Product Option"
                        >
                            <MenuItem value="" disabled>
                                Select a product type
                            </MenuItem>
                            {productTypes.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ marginBottom: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Mô tả sản phẩm
                        </Typography>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={description}
                            config={{
                                toolbar: [
                                    'heading', '|',
                                    'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                                    'blockQuote', 'undo', 'redo'
                                ]
                            }}
                            onChange={(event, editor) => {
                                const content = editor.getData();
                                setDescription(content);
                            }}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        value={price ?? ""}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Stock"
                        type="number"
                        value={stock ?? ""}
                        onChange={(e) => setStock(Number(e.target.value))}
                        sx={{ marginBottom: 2 }}
                    />
                    {image && (
                        <Box sx={{ marginBottom: 2 }}>
                            <img
                                src={`${API_URL}${image}`}
                                alt="Selected"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: "4px",
                                    marginTop: "8px",
                                    marginBottom: "8px",
                                }}
                            />
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setImage(null)}
                                sx={{ marginBottom: 2 }}
                            >
                                Remove Image
                            </Button>
                        </Box>
                    )
                    }
                    {!image
                        && (
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{ marginBottom: 2 }}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            setNewImage(e.target.files[0]);
                                        }
                                    }}
                                />
                            </Button>
                        )}
                    {newImage && (
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="body2" gutterBottom>
                                Selected Image: {newImage.name}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setImage(null)}
                                sx={{ marginBottom: 2 }}
                            >
                                Remove Image
                            </Button>
                        </Box>
                    )}
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProduct}
                >
                    Update Product
                </Button>
            </Box>
        </>
    );
}
