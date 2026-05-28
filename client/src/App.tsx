import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import ReviewQueue from "./pages/ReviewQueue";
import RecordDetails from "./pages/RecordDetails";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Dashboard />} />

        <Route path="/upload" element={<UploadPage />} />

        <Route path="/review" element={<ReviewQueue />} />

        <Route path="/records/:id" element={<RecordDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
