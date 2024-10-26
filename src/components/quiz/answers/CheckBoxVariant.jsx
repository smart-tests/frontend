import React, {useState} from 'react';
import {Box, Checkbox, IconButton, TextField} from "@mui/material";
import {Clear} from "@mui/icons-material";

const CheckBoxVariant = ({answer, updateAnswer, deleteAnswer}) => {

    const [text, setText] = useState(answer.text);
    const [isChecked, setIsChecked] = useState(answer.isRight);

    const handleTextChange = (event) => {
        setText(event.target.value);
    }
    const handleCheck = (event) => {
        setIsChecked(event.target.checked);
        commitChanges();
    }

    function commitChanges() {
        const newAnswer = structuredClone(answer);
        newAnswer.isRight = isChecked;
        newAnswer.text = text;

        updateAnswer(newAnswer);
    }

    return (
        <Box sx={{display: "flex", wrap: "no-wrap"}}>
            <Checkbox
                checked={isChecked}
                onChange={handleCheck}
            />
            <TextField
                value={text}
                onChange={handleTextChange}
                onBlur={commitChanges}
                size="small"
                fullWidth={true}
            />
            <IconButton onClick={deleteAnswer} color="warning">
                <Clear />
            </IconButton>
        </Box>
    );
};

export default CheckBoxVariant;