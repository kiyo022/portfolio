import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import CustomerListPage from "./pages/customers";
import CustomerDetailPage from "./pages/customers/[id]";
import NewCustomerPages from "./pages/customers/new";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <ThemeToggle />
      </div>

      <Routes>
        {/** 顧客一覧 */}
        <Route path="/customers" element={<CustomerListPage />} />
        {/** 顧客追加 */}
        <Route path="/customers/new" element={<NewCustomerPages />} />
        {/** 顧客詳細 */}
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        {/** 顧客編集 */}
        <Route path="/customers/:id/edit" element={<CustomerDetailPage />} />
        {/** メモ追加 */}
        <Route
          path="/customers/:id/notes/new"
          element={<CustomerDetailPage />}
        />
        {/** メモ編集 */}
        <Route path="/notes/:noteId/edit" element={<CustomerDetailPage />} />

        {/** デフォルトは顧客一覧へ */}
        <Route path="*" element={<Navigate to="/customers" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
