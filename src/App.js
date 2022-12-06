
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthCheck from "./components/hooks/useAuthCheck";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Team from "./pages/Team";


function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>Checking authentication....</div>
    ) : (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/team"
                    element={
                        <PrivateRoute>
                            <Team />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        
                                 <PrivateRoute>
                            <Projects />
                        </PrivateRoute> 
                         
                      
                    }
                />
                >
            </Routes>
        </Router>
    );
}

export default App;
