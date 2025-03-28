import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Customers from "./components/pages/Customers";
import PageLayout from "./components/ui/layout/PageLayout";
import ProtectedRoutes from "./components/ui/layout/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <PageLayout>
                <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
              </PageLayout>
            }
          />
          <Route
            path="/customer"
            element={
              <PageLayout>
                <Customers />
              </PageLayout>
            }
          />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

