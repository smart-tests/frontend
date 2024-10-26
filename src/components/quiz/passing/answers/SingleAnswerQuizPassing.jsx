import React, {useState} from 'react';
import {Box, Radio, Typography} from "@mui/material";

const SingleAnswerQuizPassing = ({answers, changeAnswer}) => {
    const [chosen, setChosen] = useState();

    function handleChangeAnswer(id) {

        return () => {
            setChosen(id);
            changeAnswer([id]);
        }
    }

    return (
        <div>
            {
                answers.map((answer) => (
                    <Answer
                        isChecked={answer.id === chosen}
                        handleRadioChange={handleChangeAnswer(answer.id)}
                        text={answer.text}
                        key={answer.id} />
                ))
            }
        </div>
    );
};

const Answer = ({isChecked, handleRadioChange, text}) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
          <Radio
              checked={isChecked}
              onChange={handleRadioChange}
          />
          <Typography>{text}</Typography>
      </Box>
    );
}

export default SingleAnswerQuizPassing;