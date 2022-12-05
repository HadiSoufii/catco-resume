import { useState, FC } from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';

interface IProps {
    id: number,
    titleModal: string,
    descriptionModal: string,
    handleDelete: (id: number) => Promise<void>,
}

const RemovalModal: FC<IProps> = ({ id, titleModal, descriptionModal, handleDelete }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <Button variant='outlined' color='error' onClick={() => setOpenModal(true)}>حذف</Button>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: 2,
                    borderColor: "white",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {titleModal}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {descriptionModal}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button onClick={() => setOpenModal(false)} variant="outlined" color='secondary'>انصراف</Button>
                        <Button onClick={() => { handleDelete(id); setOpenModal(false) }} variant="outlined" color='error' sx={{ ml: 2 }}>تایید</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default RemovalModal;