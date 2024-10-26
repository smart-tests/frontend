import React, {useState} from 'react';
import {Box, IconButton, Stack, TextField} from "@mui/material";
import {Clear} from "@mui/icons-material";

const InputAnswerVariantChange = ({answers, updateAnswer, deleteAnswer}) => {

    return (
        <Stack spacing={1} sx={{ mt:"2rem" }}>
            {answers.map((answer, index) => (
                <InputVariant
                    key={index}
                    answer={answer}
                    updateAnswer={updateAnswer(index)}
                    deleteAnswer={deleteAnswer(index)}
                />
            ))}
        </Stack>
    );
};

const InputVariant = ({answer, updateAnswer, deleteAnswer}) => {

    const [text, setText] = useState(answer.text);

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    function commitChanges() {
        const newAnswer = structuredClone(answer);
        newAnswer.isRight = true;
        newAnswer.text = text;

        updateAnswer(newAnswer);
    }

    return (
        <Box sx={{display: "flex", wrap: "no-wrap"}}>

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
}

export default InputAnswerVariantChange;