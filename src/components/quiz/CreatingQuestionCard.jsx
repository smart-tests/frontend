import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl, Grid2, IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {questionTypes} from "../../helpers/consts";
import SingleAnswerVariantChange from "./answers/SingleAnswerVariantChange";
import {DeleteForever} from "@mui/icons-material";
import MultiAnswerVariantChange from "./answers/MultiAnswerVariantChange";
import InputAnswerVariantChange from "./answers/InputAnswerVariantChange";

const CreatingQuestionCard = ({question, changeQuestion, index, deleteQuestion}) => {

    const [text, setText] = useState(question.text);
    const [answerType, setAnswerType] = useState(question.type);
    const [answers, setAnswers] = useState(question.answers);

    const handleTextChange = (event) => {
        setText(event.target.value);
    }
    const handleSelectChange = (event) => {
        setAnswerType(event.target.value);
    }
    const handleDeleteButton = () => {
        deleteQuestion();
    }

    const addAnswer = () => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers.push({});
            return newAnswers;
        })
    }

    function deleteAnswer(index) {
        const answerIndex = index;

        return () => {
            setAnswers(prev => {
                const newAnswers = structuredClone(prev);
                newAnswers.splice(answerIndex, 1);

                return newAnswers;
            })
        }
    }

    function updateAnswer(index) {
        const answerIndex = index;

        return (newAnswer) => {
            setAnswers(prev => {
                const newAnswers = structuredClone(prev);

                if (newAnswer.isRight && answerType === questionTypes.SINGLE_ANSWER) {
                    newAnswers.forEach(answer => answer.isRight = false);
                }

                newAnswers[answerIndex] = newAnswer;
                commitChanges();
                return newAnswers;
            })
        }
    }

    function commitChanges() {
        let questionClone = structuredClone(question);
        questionClone.text = text;
        questionClone.type = answerType;
        questionClone.answers = answers;

        changeQuestion(questionClone);
    }

    useEffect(() => {
        commitChanges();
    }, [answerType]);


    return <Card  elevation={3}>
        <CardContent>
            <Grid2 container sx={{ display:"flex", alignItems:"start", justifyContent:"space-between"}}>

                <Grid2 size={{ xs: 9}}>
                    <Typography variant="h6">Вопрос {index + 1}</Typography>
                </Grid2>

                <Grid2 size={{ xs: 1}}>
                    <FormControl>
                        <InputLabel>Тип ответа</InputLabel>
                        <Select
                            label="Тип ответа"
                            variant="outlined"
                            value={answerType}
                            onChange={handleSelectChange}
                            size="small"
                        >
                            <MenuItem value={questionTypes.SINGLE_ANSWER}>Один верный</MenuItem>
                            <MenuItem value={questionTypes.MULTI_ANSWER}>Несколько верных</MenuItem>
                            <MenuItem value={questionTypes.INPUT_ANSWER}>Поле для ввода</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 2}} sx={{ textAlign:"end"}}>
                    <IconButton color="warning" variant="contained" onClick={handleDeleteButton}>
                        <DeleteForever />
                    </IconButton>
                </Grid2>
            </Grid2>

            <TextField
                fullWidth={true}
                variant="standard"
                label="Текст вопроса"
                value={text}
                onChange={handleTextChange}
                onBlur={commitChanges}
            />
            <Box sx={{ display: "flex", alignItems: "end", gap: "1rem" }}>

            </Box>
            <Box sx={{mt: 1}}>
                {answerType === questionTypes.SINGLE_ANSWER
                    ? <SingleAnswerVariantChange
                            answers={answers}
                            updateAnswer={updateAnswer}
                            deleteAnswer={deleteAnswer}/>
                    : answerType === questionTypes.MULTI_ANSWER
                    ? <MultiAnswerVariantChange
                            answers={answers}
                            updateAnswer={updateAnswer}
                            deleteAnswer={deleteAnswer}/>
                    : <InputAnswerVariantChange
                            answers={answers}
                            updateAnswer={updateAnswer}
                            deleteAnswer={deleteAnswer}/>
                }
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center"}}>
                <Button variant="outlined" onClick={() => addAnswer()}>Добавить</Button>
            </Box>
        </CardContent>
    </Card>
}

export default CreatingQuestionCard;