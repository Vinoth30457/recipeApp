import Cuisine from "./Cuisine";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Login from "./regitration/Login";
import SignUp from "./regitration/SignUp";
import { GiKnifeFork } from "react-icons/gi";
import Search from "../components/Search";
import Category from "../components/Category";
import HomeMain from "./HomeMain";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recipe/:name" element={<Recipe />} />
    </Routes>
  );
};

export default Pages;
// eslint-disable-next-line react/prop-types
export const ProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return children;
  } else {
    return (window.location.href = "/login");
  }
};
