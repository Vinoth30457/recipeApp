import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import HomeMain from "./HomeMain";
import myContext from "../context/data/myContext";
import { AiFillHeart } from "react-icons/ai";

const Searched = () => {
  const context = useContext(myContext);
  const { addCart, deleteCart, userId } = context;
  const [search, setSearched] = useState([]);
  let params = useParams();
  const getSearched = async (name) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=93a333a1dd66464d9d48a31199e0911f&query=${name}`
    );
    const data = await api.json();
    setSearched(data.results);
  };
  useEffect(() => {
    getSearched(params.search);
    console.log(params);
  }, [params.search]);
  return (
    <HomeMain>
      <Grid>
        {search.map((item) => {
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
  font-size: 2.5rem;
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

export default Searched;
