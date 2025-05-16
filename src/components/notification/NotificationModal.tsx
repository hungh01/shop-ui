import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

interface NotificationModalProps {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
    title?: string;
    message: string;
    acceptText?: string;
    cancelText?: string;
}

export default function NotificationModal({
    open,
    onClose,
    onAccept,
    title = 'Thông báo',
    message,
    acceptText = 'Đồng ý',
    cancelText = 'Huỷ',
}: NotificationModalProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    {cancelText}
                </Button>
                <Button onClick={onAccept} color="primary" variant="contained">
                    {acceptText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
