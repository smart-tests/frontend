import {Stack} from "@mui/material";
import RadioVariant from "./RadioVariant";

const SingleAnswerVariantChange = ({answers, updateAnswer, deleteAnswer}) => {

    return (
        <Stack spacing={1} sx={{ mt:"2rem" }}>
            {answers.map((answer, index) => (
                <RadioVariant
                    key={index}
                    answer={answer}
                    updateAnswer={updateAnswer(index)}
                    deleteAnswer={deleteAnswer(index)}
                />
            ))}
        </Stack>
    );
};

export default SingleAnswerVariantChange;