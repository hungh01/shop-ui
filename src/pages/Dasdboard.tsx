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
import AlertBox from "@/components/Alert";

interface ProductOption {
    id: number;
    name: string;
    categoryId: number;
}

export default function Dashboard() {

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
    const [image, setImage] = useState<File | null>(null);

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

    const handleAddProduct = async () => {
        if (
            selectedOption === null ||
            !name ||
            !description ||
            price === null ||
            stock === null ||
            !image
        ) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("stock", stock.toString());
        formData.append("image", image);
        formData.append("categoryId", selectedOption.toString());
        try {
            const response = await fetch(`${API_URL}/products`, {
                method: "POST",
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                handleAlert("Thêm mới thành công!", 'success');
                setName("");
                setDescription("");
                setPrice(null);
                setStock(null);
                setImage(null);
                setSelectedOption(null);
            } else {
                handleAlert("Thêm mới thất bại.", 'error');

            }
        } catch (error) {
            handleAlert("Thêm mới thất bại.", 'error');
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
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
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
                                    setImage(e.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                    {image && (
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="body2" gutterBottom>
                                Selected Image: {image.name}
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
                    onClick={handleAddProduct}
                >
                    Add Product
                </Button>
            </Box>
        </>
    );
}
