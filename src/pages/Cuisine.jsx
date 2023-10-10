import styled from "styled-components";

import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import HomeMain from "./HomeMain";
import { AiFillHeart } from "react-icons/ai";
import myContext from "../context/data/myContext";

const Cuisine = () => {
  const context = useContext(myContext);
  const { addCart, deleteCart, userId } = context;
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=93a333a1dd66464d9d48a31199e0911f&cuisine=${name}`
    );
    const data = await api.json();
    setCuisine(data.results);
  };
  useEffect(() => {
    getCuisine(params.type);
    console.log(params);
  }, [params.type]);
  // console.log(cuisine);
  return (
    <HomeMain>
      <Grid>
        {cuisine.map((item) => {
          return (
            <CardWrapper key={item.id}>
              <Card>
                <Link to={"/recipe/" + item.id}>
                  <img src={item.image} alt={item.title} />
                  <h4>{item.title}</h4>
                </Link>
              </Card>
              <Button onClick={() => addCart(item)}>
                <AiFillHeart />
              </Button>
            </CardWrapper>
          );
        })}
      </Grid>
    </HomeMain>
  );
};
const CardWrapper = styled.div`
  position: relative;
`;
const Button = styled.button`
  color: red;
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: 2rem;
  z-index: 10;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  color: #fff;

  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);

  img {
    width: 100%;
    /* box-shadow: rgba(255, 176, 0, 0.9) 0px 5px 20px; */
    box-shadow: 0px 9px 30px rgba(255, 149, 5, 0.9);

    border-radius: 10px;
    object-fit: cover;
    object-position: center;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
  Link {
    color: #313131;
  }
`;

export default Cuisine;
