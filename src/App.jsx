import Category from "./components/Category";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";
import Login from "./pages/regitration/Login";
import SignUp from "./pages/regitration/SignUp";
import Home from "./pages/Home";
import Cuisine from "./pages/Cuisine";
import Searched from "./pages/Searched";
import Recipe from "./pages/Recipe";
import MyState from "./context/data/myState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const ProtectedRouteNoLogin = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("userRecipe"));
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const ProtectedRouteOnLogin = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("userRecipe"));
    if (user) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <MyState>
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/"
            element={
              <ProtectedRouteNoLogin>
                <Pages />
              </ProtectedRouteNoLogin>
            }
          /> */}
          <Route
            path="/"
            element={
              <ProtectedRouteNoLogin>
                <Home />
              </ProtectedRouteNoLogin>
            }
          />
          <Route
            path="/cuisine/:type"
            element={
              <ProtectedRouteNoLogin>
                <Cuisine />
              </ProtectedRouteNoLogin>
            }
          />
          <Route
            path="/searched/:search"
            element={
              <ProtectedRouteNoLogin>
                <Searched />
              </ProtectedRouteNoLogin>
            }
          />
          <Route
            path="/recipe/:name"
            element={
              <ProtectedRouteNoLogin>
                <Recipe />
              </ProtectedRouteNoLogin>
            }
          />

          <Route
            path="/login"
            element={
              <ProtectedRouteOnLogin>
                <Login />
              </ProtectedRouteOnLogin>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRouteOnLogin>
                <SignUp />
              </ProtectedRouteOnLogin>
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </MyState>
  );
};
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-family: "Lobster Two", cursive;
  font-weight: 400;
  color: #313131;
`;
const Nav = styled.div`
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

export default App;

// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import Login from "./pages/regitration/Login";
// import SignUp from "./pages/regitration/SignUp";
// import Home from "./pages/Home";
// import MyState from "./context/data/myState";
// import Cuisine from "./pages/Cuisine";
// import Searched from "./pages/Searched";
// import Recipe from "./pages/Recipe";

// const App = () => {
//   return (
//     <MyState>
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <ProtectedRoutes>
//                 <Home />
//               </ProtectedRoutes>
//             }
//           />
//           <Route path="/cuisine/:type" element={<Cuisine />} />
//           <Route path="/searched/:search" element={<Searched />} />
//           <Route path="/recipe/:name" element={<Recipe />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//         <ToastContainer />
//       </Router>
//     </MyState>
//   );
// };

// export default App;

// //user

// export const ProtectedRoutes = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// //admin

// export const ProtectedRoutesForAdmin = ({ children }) => {
//   const admin = JSON.parse(localStorage.getItem("user"));
//   console.log(admin.user.email);
//   if (admin.user.email === "vinoth30457@gmail.com") {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };
