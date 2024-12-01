import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import PetsPage from "./pages/PetsPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="pets" element={<PetsPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pets/:id" element={<PetDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
