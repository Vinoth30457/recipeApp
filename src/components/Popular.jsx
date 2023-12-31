import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import myContext from "../context/data/myContext";
// import { addToCart, deleteFromCart } from "../redux/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { AiFillHeart } from "react-icons/ai";

const Popular = () => {
  const context = useContext(myContext);
  const { addCart, deleteCart, userId } = context;
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    getPopular();
  }, []);
  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=93a333a1dd66464d9d48a31199e0911f&number=10`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };
  // console.log(popular);
  // const [fav, setFav] = useState(true);

  // const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart);

  // const addCart = (recipe) => {
  //   dispatch(addToCart(recipe));
  //   setFav(false);
  //   toast.success("add to cart");
  // };
  // const deleteCart = (item) => {
  //   dispatch(deleteFromCart(item));

  //   toast.success("delete g cart");
  // };
  // const [item, setItem] = useState([]);
  // useEffect(() => {
  //   let cart = [...new Set(cartItems)];

  //   console.log(cart);
  //   localStorage.setItem("fav", JSON.stringify(cart));
  //   let fav = JSON.parse(localStorage.getItem("fav"));
  //   setItem(fav);
  // }, [cartItems]);
  // console.log(item);
  // const userId = JSON.parse(localStorage.getItem("userRecipe"));

  return (
    <Wrapper>
      <h3 style={{ textDecoration: "underline", marginBottom: "3rem" }}>
        Popular Picks
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
        {popular.map((recipe) => {
          return (
            <CardWrapper key={recipe.id}>
              <Card key={recipe.id}>
                <Link to={"/recipe/" + recipe.id}>
                  <img src={recipe.image} alt={recipe.title} />

                  <Gradient />
                </Link>
              </Card>
              <Button onClick={() => addCart(recipe)}>
                <AiFillHeart />
              </Button>
              <p>{recipe.title}</p>
            </CardWrapper>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;

  p {
    /* position: absolute; */
    color: #ffff;
    text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
      0px -4px 10px rgba(255, 255, 255, 0.3);
    text-align: center;
  }
  h3 {
    font-size: 2rem;
    color: #ffff;
    text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
      0px -4px 10px rgba(255, 255, 255, 0.3);
  }
`;
const CardWrapper = styled.div`
  width: 15rem;
  height: 20rem;
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
const Card = styled.div`
  width: 15rem;
  height: 13rem;
  box-shadow: 0px 9px 30px rgba(255, 149, 5, 0.9);
  border-radius: 10px;
  margin-bottom: 2rem;
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
  /* p {
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
  } */
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
