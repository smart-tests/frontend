import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CreateQuizPage from "./pages/CreateQuizPage";
import {createTheme, CssBaseline, GlobalStyles, ThemeProvider} from "@mui/material";
import UserCreatedQuizzesPage from "./pages/UserCreatedQuizzesPage";
import QuizPassingPage from "./pages/QuizPassingPage";
import LoginPage from "./pages/LoginPage";
import UserCreatedGroupsPage from "./pages/UserCreatedGroupsPage";
import GroupEditPage from "./pages/GroupEditPage";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ru';
import StartPage from "./pages/StartPage";
import QuizzesForPassingPage from "./pages/QuizzesForPassingPage";
import QuizResultsPage from "./pages/QuizResultsPage";

function App() {

    const theme = createTheme({
        palette: {
            primary: {
                light: '#5E69DE',
                main: '#5E69DE',
                dark: '#5E69DE',
                contrastText: '#fff',
            },
            secondary: {
                light: '#DED35E',
                main: '#DED35E',
                dark: '#DED35E',
                contrastText: '#000',
            },
        },
        components: {
            MuiCard: {
                defaultProps: {
                    variant: 'outlined'
                }
            }
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
            <ThemeProvider theme={theme}>
                <BrowserRouter>

                    <CssBaseline/>

                    <GlobalStyles
                        styles={{
                            body: { backgroundColor: '#f4f4f4' },
                        }}
                    />

                    <Routes>

                        <Route path='/' element={<StartPage />}/>

                        <Route path='/login' element={<LoginPage/>} />

                        <Route path='/groups'>
                            <Route path='created' element={<UserCreatedGroupsPage />}/>
                            <Route path=':id/edit' element={<GroupEditPage />}/>
                        </Route>

                        <Route path='/tests'>
                            <Route path='created' element={<UserCreatedQuizzesPage/>}/>
                            <Route path='creating' element={<CreateQuizPage/>}/>

                            <Route path='education' element={<QuizzesForPassingPage/>} />
                            <Route path='education/passing/:id' element={<QuizPassingPage/>} />

                            <Route path='teaching/results/:id' element={<QuizResultsPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
