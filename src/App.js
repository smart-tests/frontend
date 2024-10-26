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
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>

                <CssBaseline/>

                <GlobalStyles
                    styles={{
                        body: { backgroundColor: '#f4f4f4' },
                    }}
                />

                <Routes>

                    <Route path='/' element={<CreateQuizPage/>}/>

                    <Route path='/tests'>
                        <Route path='created' element={<UserCreatedQuizzesPage/>}/>
                        <Route path='creating' element={<CreateQuizPage/>}/>
                        <Route path='passing' element={<QuizPassingPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
