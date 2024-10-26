import React from 'react';
import {Box, Card, CardContent, Typography} from "@mui/material";
import SingleAnswerQuizPassing from "./answers/SingleAnswerQuizPassing";
import * as quizHelper from "../../../helpers/quizHelper";
import {questionTypes} from "../../../helpers/consts";
import MultiAnswerQuizPassing from "./answers/MultiAnswerQuizPassing";
import InputAnswerQuizPassing from "./answers/InputAnswerQuizPassing";

const QuizQuestion = ({question, index, addAnswer}) => {

    function handleAnswerChange(questionId) {

        return (answerIds, answerText = null) => {
            let questionChoice = quizHelper.getQuestionChoice(questionId, answerIds, answerText);
            addAnswer(questionChoice);
        }
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Box sx={{ display:"flex", justifyContent:"space-between", gap:2 }}>
                    <Typography>{question.text}</Typography>

                    <Typography sx={{ whiteSpace: "nowrap", color: "text.secondary" }}>Вопрос {index + 1}</Typography>
                </Box>

                <Box sx={{ mt:2 }}>
                    {
                        question.type === questionTypes.SINGLE_ANSWER
                            ? <SingleAnswerQuizPassing
                                answers={question.answers}
                                changeAnswer={handleAnswerChange(question.id)} />
                            : question.type === questionTypes.MULTI_ANSWER
                                ? <MultiAnswerQuizPassing
                                    answers={question.answers}
                                    changeAnswer={handleAnswerChange(question.id)}/>
                                : <InputAnswerQuizPassing
                                    changeAnswer={handleAnswerChange(question.id)}/>
                    }
                </Box>

            </CardContent>
        </Card>
    );
};

export default QuizQuestion;