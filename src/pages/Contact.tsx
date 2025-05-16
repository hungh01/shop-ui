import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";

export default function Contact() {
    return (
        <Container maxWidth="lg" className="pt-30 pb-16" sx={{
            minHeight: "50vh", // chiếm toàn bộ chiều cao màn hình
            display: "flex",
            justifyContent: "center", // canh giữa theo chiều ngang
            py: 4, // padding top/bottom nhỏ nếu cần
            paddingTop: 20
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" }, // dọc ở mobile, ngang ở md+
                    gap: 4,
                }}
            >
                {/* Left Side: Contact Info */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Liên hệ với chúng tôi
                    </Typography>


                    <Stack spacing={3} mt={4}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <span className="text-orange-500 text-xl">📞</span>
                            <Typography variant="body1">0858.547.574</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <span className="text-orange-500 text-xl">📧</span>
                            <Typography variant="body1">info@mediaproper.com</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <span className="text-orange-500 text-xl">📍</span>
                            <Typography variant="body1">
                                Số 123, Đường ABC, Phường XYZ,
                                <br />
                                Quận 1, TP. Hồ Chí Minh
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>

                {/* Right Side: Contact Form */}
                <Box sx={{ flex: 1 }}>
                    <form>
                        <Stack spacing={2}>
                            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                                <TextField label="First" fullWidth required />
                                <TextField label="Last" fullWidth required />
                            </Box>
                            <TextField label="Email" type="email" fullWidth required />
                            <TextField label="Phone (optional)" fullWidth />
                            <TextField label="Message" multiline rows={4} fullWidth required />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#FF5722",
                                    "&:hover": { backgroundColor: "#E64A19" },
                                    color: "#fff",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                    borderRadius: "4px",
                                    width: "fit-content",
                                }}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}