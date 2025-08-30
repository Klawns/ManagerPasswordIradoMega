import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import GeneratorPage from "./Pages/PasswordGeneratorPage";
import CustomizePage from "./Pages/CustomizePasswordPage";
import VaultPage from "./Pages/VaultPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<VaultPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/custompassword" element={<CustomizePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
