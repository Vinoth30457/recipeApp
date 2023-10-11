import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HomeMain from "./HomeMain";
import { AiFillHeart } from "react-icons/ai";
import myContext from "../context/data/myContext";

const Recipe = () => {
  const context = useContext(myContext);
  const { addCart, deleteCart, userId } = context;
  const [details, setDetails] = useState("");
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();
  const fetchDetails = async (id) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=014c00f514d94705b5fb5c99fdd12323`
    );
    const detailsData = await data.json();
    setDetails(detailsData);
  };

  useEffect(() => {
    fetchDetails(params.name);
  }, [params.name]);
  console.log(details);
  return (
    <HomeMain>
      <DetailWrapper>
        <div
          className="image"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h2>{details.title}</h2>
          <img src={details.image} alt={details.title} />
        </div>
        <Info
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              className={activeTab === "instructions" ? "active" : ""}
              onClick={() => setActiveTab("instructions")}
            >
              instructions
            </Button>
            <Button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              ingredients
            </Button>
            <button
              style={{
                color: "red",
                fontSize: "2.5rem",
                filter:
                  "drop-shadow(-3px -3px 10px rgba(0, 0, 0, 1)) drop-shadow(3px 3px 2px rgba(0, 0, 0, 1)drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2))drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2))",
              }}
              onClick={() => addCart(details)}
            >
              <AiFillHeart />
            </button>
          </div>
          {activeTab === "instructions" && (
            <div style={{ marginTop: "2rem" }}>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  marginBottom: "1rem",
                }}
                dangerouslySetInnerHTML={{ __html: details.summary }}
              ></p>
              <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ul>
              {details.extendedIngredients.map((item) => {
                return <li key={item.id}>{item.original}</li>;
              })}
            </ul>
          )}
        </Info>
      </DetailWrapper>
    </HomeMain>
    // <div>
    //   {details.map((item) => {
    //     return <h1 key={item.id}>{item.title}</h1>;
    //   })}
    // </div>
  );
};
const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: #ffff;
  text-align: center;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
  img {
    width: 100%;
    border-radius: 10px;
  }
  .image {
    width: 40%;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;
const Info = styled.div`
  width: 100%;
`;

export default Recipe;
