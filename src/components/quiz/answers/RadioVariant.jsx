import React, {useEffect, useState} from 'react';
import {Box, IconButton, Radio, TextField} from "@mui/material";
import {Clear} from "@mui/icons-material";

const RadioVariant = ({answer, updateAnswer, deleteAnswer}) => {

    let clone = structuredClone(answer);
    const [text, setText] = useState(clone.text);
    const [isChecked, setIsChecked] = useState(clone.isRight);

    const handleTextChange = (event) => {
        setText(event.target.value);
    }
    const handleRadioChange = (event) => {
        setIsChecked(event.target.checked);
    }

    useEffect(() => {
        clone.text = text;
        clone.isRight = isChecked;

        updateAnswer(clone);
    }, [text, isChecked]);

    useEffect(() => {
        clone = structuredClone(answer);

        setText(clone.text);
        setIsChecked(clone.isRight);
    }, [answer]);

    return (
        <Box sx={{display: "flex", wrap: "no-wrap"}}>
            <Radio
                checked={isChecked}
                onChange={handleRadioChange}
            />
            <TextField
                variant="standard"
                value={text}
                onChange={handleTextChange}
                size="small"
                fullWidth={true}
            />
            <IconButton onClick={deleteAnswer} color="warning">
                <Clear />
            </IconButton>
        </Box>
    );
};

export default RadioVariant;