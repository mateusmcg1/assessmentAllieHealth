import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home";
import UpdateForm from "../update/UpdateForm";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<UpdateForm />} />
      </Routes>
    </BrowserRouter>
  );
}
