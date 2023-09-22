import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import StudentsPAge from "./pages/StudentsPAge";
import Dashboard from "./pages/Dashboard";
import LOginPage from "./pages/LOginPage";
import Admin from "./layout/Admin";
import { TeacherPage } from "./pages/TeacherPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<LOginPage />} />

        <Route path="/" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teacher" element={<TeacherPage />} />
          <Route path="students" element={<StudentsPAge />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
