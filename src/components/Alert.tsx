import { Alert, Snackbar } from "@mui/material";

type AlertBoxProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    severity: 'success' | 'error' | 'warning' | 'info';
    message: string;
};

export default function AlertBox({ setOpen, open, severity, message }: AlertBoxProps) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
