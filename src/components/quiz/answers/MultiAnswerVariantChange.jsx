import React from 'react';
import {Stack} from "@mui/material";
import CheckBoxVariant from "./CheckBoxVariant";

const MultiAnswerVariantChange = ({answers, updateAnswer, deleteAnswer}) => {

    return (
        <Stack spacing={1} sx={{ mt:"2rem" }}>
            {answers.map((answer, index) => (
                <CheckBoxVariant
                    key={index}
                    answer={answer}
                    updateAnswer={updateAnswer(index)}
                    deleteAnswer={deleteAnswer(index)}
                />
            ))}
        </Stack>
    );
};

export default MultiAnswerVariantChange;