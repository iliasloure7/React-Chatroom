import Header from "./components/Header";
import Chatroom from "./pages/Chatroom";
import PrivateRoutes from "./components/PrivateRoutes";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Paths } from "./constants";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={Paths.HOME} element={<PrivateRoutes />}>
            <Route path={Paths.HOME} element={<Chatroom />} />
          </Route>
          <Route path={Paths.SIGNIN} element={<SignIn />} />
          <Route path={Paths.SIGNUP} element={<SignUp />} />
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
