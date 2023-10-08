import styled from "styled-components";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Veggie = () => {
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
  console.log(veggie);
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
            <Card key={recipe.id}>
              <Link to={"/recipe/" + recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Link>
            </Card>
          );
        })}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  width: 15rem;
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
