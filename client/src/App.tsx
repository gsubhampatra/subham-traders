import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import CreateTransaction from "./components/pages/CreateTransaction";
import PageLayout from "./components/ui/layout/PageLayout";
import Stock from "./components/pages/Stock";
import DealerPage from "./components/pages/DealerPage";
import { ItemsPage } from "./components/pages/ItemsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout>
              <Home />
            </PageLayout>
          }
        />
        <Route
          path="/items"
          element={
            <PageLayout>
              <ItemsPage />
            </PageLayout>
          }
        />
        <Route
          path="/transactions"
          element={
            <PageLayout>
              <CreateTransaction />
            </PageLayout>
          }
        />
        <Route
          path="/stock"
          element={
            <PageLayout>
              <Stock />
            </PageLayout>
          }
        />
        <Route
          path="/dealer"
          element={
            <PageLayout>
              <DealerPage />
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
