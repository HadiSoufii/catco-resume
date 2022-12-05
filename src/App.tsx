import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { NotFound, ProtectedRoute } from "./components";
import { adminRoutes } from "./routes";

import { AuthProvider } from "./services/auth/Auth";
import { MainContainer, AdminContainer } from "./containers";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            {/* Routes Main */}
            <Route path="/home" element={<MainContainer />} />

            {/* Routes Admin */}
            <Route path="/admin" element={<AdminContainer />}>
              <Route path="/admin" element={<Navigate to="/admin/userpanel" />} />
              {
                adminRoutes.map((prop, key) => {
                  if (prop.private || prop.isAdmin) {
                    return <Route key={key} path={prop.path}
                      element={<ProtectedRoute isAdmin={prop.isAdmin} element={<prop.component />} />} />
                  } else {
                    return <Route key={key} path={prop.path} element={<prop.component />} />
                  }
                })
              }
            </Route>

            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>

      <ToastContainer
        rtl={true}
        position="top-right"
        theme="colored"
      />
    </>
  );
}

export default App;
