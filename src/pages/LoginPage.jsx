import React from 'react';
import Header from "../modules/Header";
import {
    Button,
    Container, FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import * as backend from "../api/QuizService";
import {useNavigate} from "react-router-dom";
import * as consts from "../helpers/consts";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const LoginPage = () => {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    let navigate = useNavigate();

    function submit() {
        backend.login(login,
            password,
            (log, pass) => {},
            (data) => {toCreatedTests()},
            (error) => {console.log(error)});
    }

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    }

    const handleLogin = (event) => {
        setLogin(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    function toCreatedTests() {
        navigate(consts.links.USER_CREATED_QUIZZES)
    }

    return (
        <div>
            <Header />
            <Container
                maxWidth={false}
                sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                maxWidth: "400px",
                gap:2}}>

                <Typography component="h1" variant="h5" textAlign="center">
                    Вход
                </Typography>

                <TextField
                    name="username"
                    value={login}
                    onChange={handleLogin}
                    label="Логин"/>

                <FormControl>
                    <InputLabel htmlFor="password-input">Пароль</InputLabel>
                    <OutlinedInput
                        name="password"
                        id="password-input"
                        type={showPassword ? 'text' : 'password'}
                        label="Пароль"
                        value={password}
                        onChange={handlePassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }/>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={submit}>
                    Войти
                </Button>
            </Container>
        </div>
    );
};

export default LoginPage;