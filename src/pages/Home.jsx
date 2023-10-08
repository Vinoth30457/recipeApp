import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import Search from "../components/Search";
import Category from "../components/Category";
import HomeMain from "./HomeMain";

const Home = () => {
  return (
    <div>
      <HomeMain>
        <Veggie />
        <Popular />
      </HomeMain>
    </div>
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

export default Home;
