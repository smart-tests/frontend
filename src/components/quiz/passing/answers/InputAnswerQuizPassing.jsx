import React, {useState} from 'react';
import {Box, TextField} from "@mui/material";

const InputAnswerQuizPassing = ({changeAnswer}) => {
    const [answer, setAnswer] = useState("");

    function handleInput(event) {
        setAnswer(event.target.value);
    }

    function handleChangeAnswer() {
        changeAnswer([], answer);
    }

    return (
        <div>
            <Answer
                content={answer}
                setContent={handleInput}
                onBlur={handleChangeAnswer}
                key={answer.id} />
        </div>
    );
};

const Answer = ({content, setContent, onBlur}) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
                value={content}
                onChange={setContent}
                onBlur={onBlur}
                size="small"
                fullWidth={true}
            />
        </Box>
    );
}

export default InputAnswerQuizPassing;