import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

const AddGroupQuiz = ({quizzes, isOpen, onClose, onSubmit}) => {

    const [selectedQuiz, setSelectedQuiz] = React.useState('');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    function handleChangeSelectedQuiz(e) {
        setSelectedQuiz(e.target.value);
    }
    function handleChangeStartDate(e) {
        setStartDate(e);
    }
    function handleChangeEndDate(e) {
        setEndDate(e);
    }

    function handleSubmit() {
        onSubmit(selectedQuiz.id, startDate.$d.toLocaleDateString(), endDate.$d.toLocaleDateString());
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth={true}>
            <DialogTitle>
                Добавить тест
            </DialogTitle>

            <DialogContent>
                <Box sx={{ minWidth: 120, display:"flex", flexDirection:"column", gap:3 }}>
                    <FormControl fullWidth sx={{ mt: 1}}>
                        <InputLabel id="demo-simple-select-label">Тест</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={selectedQuiz}
                            label="Age"
                            onChange={handleChangeSelectedQuiz}
                            variant='outlined'>
                            {
                                quizzes?.map(quiz =>
                                    <MenuItem value={quiz} key={quiz.id}>{quiz.title}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <Box sx={{ display:"flex", justifyContent: "space-between" }}>
                        <DatePicker
                            label='Дата начала'
                            value={startDate}
                            onChange={handleChangeStartDate}/>

                        <DatePicker
                            label='Дата завершения'
                            value={endDate}
                            onChange={handleChangeEndDate}/>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit}>Добавить</Button>
                <Button onClick={onClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddGroupQuiz;