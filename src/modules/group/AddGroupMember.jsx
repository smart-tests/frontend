import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const AddGroupMember = ({isOpen, onClose, onSubmit}) => {

    const [userLogin, setUserLogin] = useState('');

    function handleUserLoginChange(e) {
        setUserLogin(e.target.value);
    }
    function handleSubmit() {
        onSubmit(userLogin);
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth={true}>
            <DialogTitle>
                Добавить участника
            </DialogTitle>

            <DialogContent>
                <TextField
                    sx={{ mt: 1}}
                    fullWidth={true}
                    label='Логин'
                    value={userLogin}
                    onChange={handleUserLoginChange}/>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit}>Добавить</Button>
                <Button onClick={onClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddGroupMember;