import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<Home />} />
          <Route path="/new" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
