import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks, GiIndianPalace } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Category = () => {
  return (
    <List>
      <SLink to={"/cuisine/Indian"}>
        <GiIndianPalace />
        <h4>Indian</h4>
      </SLink>
      <SLink to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"/cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"/cuisine/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  );
};
const List = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem 0;
  gap: 2rem;
`;
const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transform: scale(0.8);
  h4 {
    color: white;
    font-size: 0.7rem;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;
export default Category;
