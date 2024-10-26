import React, {useState} from 'react';
import {Box, Checkbox, Typography} from "@mui/material";

const MultiAnswerQuizPassing = ({answers, changeAnswer}) => {
    const [chosen, setChosen] = useState(new Set());

    function handleChangeAnswer(id) {

        return (event) => {
            setChosen(prev => {
                if (event.target.checked) {
                    prev.add(id);
                } else {
                    prev.delete(id);
                }
                return new Set(prev);
            });

            changeAnswer([...chosen]);
        }
    }

    return (
        <div>
            {
                answers.map((answer) => (
                    <Answer
                        isChecked={chosen.has(answer.id)}
                        handleCheckboxChange={handleChangeAnswer(answer.id)}
                        text={answer.text}
                        key={answer.id} />
                ))
            }
        </div>
    );
};

const Answer = ({isChecked, handleCheckboxChange, text}) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <Typography>{text}</Typography>
        </Box>
    );
}

export default MultiAnswerQuizPassing;