/**
 * メインアプリケーションコンポーネント
 */
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { useTheme } from "./hooks/useTheme";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";
import CustomerListPage from "./pages/CustomerListPage";
import "./styles/animations.css";
import "./styles/globals.css";

/**
 * アプリケーションのメインコンポーネント
 */
function App() {
  // テーマ管理フック
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          minHeight: "100vh",
          transition: "background-color var(--transition-base)",
        }}
      >
        {/* ナビゲーションバー */}
        <Navbar theme={theme} onThemeToggle={toggleTheme} />

        {/* メインコンテンツ */}
        <main style={{ padding: "var(--spacing-4)" }}>
          <Routes>
            {/* 顧客一覧ページ */}
            <Route path="/" element={<CustomerListPage />} />

            {/* 顧客詳細ページ */}
            <Route path="/customers/:id" element={<CustomerDetailPage />} />

            {/* 顧客新規作成ページ */}
            <Route path="/customers/new" element={<CustomerFormPage />} />

            {/* 顧客編集ページ */}
            <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
