import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeMain from "./HomeMain";
import myContext from "../context/data/myContext";
import { useContext } from "react";

const Fav = () => {
  const context = useContext(myContext);
  const { addCart, deleteCart, userId, item } = context;
  return (
    <HomeMain>
      {item.length > 0 ? (
        <Grid>
          {item.map((item) => {
            return (
              <CardWrapper key={item.id}>
                <Card>
                  <Link to={"/recipe/" + item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                  </Link>
                </Card>
                <Button onClick={() => deleteCart(item)}>
                  <AiFillDelete />
                </Button>
              </CardWrapper>
            );
          })}
        </Grid>
      ) : (
        <h1
          style={{
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "#fff",
            textShadow:
              "2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(255, 255, 255, 0.3)",
          }}
        >
          You don&apos;t have favorite
        </h1>
      )}
    </HomeMain>
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
  font-size: 2rem;
  z-index: 10;
  filter: drop-shadow(-3px -3px 10px rgba(0, 0, 0, 1))
    drop-shadow(3px 3px 2px rgba(0, 0, 0, 1))
    drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2))
    drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2));
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

export default Fav;
