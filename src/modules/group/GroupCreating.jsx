import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const GroupCreating = ({isOpen, onCreate, onClose}) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }
    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }
    function handleSubmit() {
        const data = {
            name: name,
            description: description,
        }
        onCreate(data);
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth={true}>
            <DialogTitle>
                Создание группы
            </DialogTitle>

            <DialogContent sx={{ display:"flex", flexDirection:"column", gap:3}}>
                <TextField sx={{mt:3}} label='Название' value={name} onChange={handleNameChange}/>
                <TextField label='Описание' value={description} onChange={handleDescriptionChange}/>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit}>Создать</Button>
                <Button onClick={onClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GroupCreating;