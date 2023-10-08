import styled from "styled-components";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeMain from "./HomeMain";

const Cuisine = () => {
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
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </HomeMain>
  );
};
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;

    border-radius: 2rem;
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
