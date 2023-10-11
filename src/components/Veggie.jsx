import styled from "styled-components";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import myContext from "../context/data/myContext";

const Veggie = () => {
  const context = useContext(myContext);
  const { addCart, deleteCart, userId } = context;
  const [veggie, setVeggie] = useState([]);
  useEffect(() => {
    getPopular();
  }, []);
  const getPopular = async () => {
    const check = localStorage.getItem("veggie");
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=93a333a1dd66464d9d48a31199e0911f&number=10&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };
  // console.log(veggie);
  return (
    <Wrapper>
      <h3 style={{ textDecoration: "underline", marginBottom: "3rem" }}>
        Our Vegetarian Picks
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {veggie.map((recipe) => {
          return (
            <CardWrapper key={recipe.id}>
              <Card>
                <Link to={"/recipe/" + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
              <Button onClick={() => addCart(recipe)}>
                <AiFillHeart />
              </Button>
            </CardWrapper>
          );
        })}
      </div>
    </Wrapper>
  );
};
const CardWrapper = styled.div`
  position: relative;
`;
const Button = styled.button`
  color: red;
  position: absolute;
  top: 0%;
  right: 0%;
  font-size: 2.5rem;
  z-index: 10;
  filter: drop-shadow(-3px -3px 10px rgba(0, 0, 0, 1))
    drop-shadow(3px 3px 2px rgba(0, 0, 0, 1))
    drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2))
    drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2));
`;
const Wrapper = styled.div`
  margin: 4rem 0rem;
  h3 {
    font-size: 2rem;
    color: #ffff;
    text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
      0px -4px 10px rgba(255, 255, 255, 0.3);
  }
`;
const Card = styled.div`
  width: 15rem;
  box-shadow: 0px 9px 30px rgba(255, 149, 5, 0.9);
  height: 13rem;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    left: 0;

    object-fit: cover;
    object-position: center;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
