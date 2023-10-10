import React, { useContext, useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Search from "../components/Search";
import Category from "../components/Category";

import myContext from "../context/data/myContext";

const HomeMain = ({ children }) => {
  const context = useContext(myContext);
  const { user } = context;
  const [openPro, SetPro] = useState(false);
  // console.log(user);
  const userId = JSON.parse(localStorage.getItem("userRecipe"));
  const logout = () => {
    localStorage.clear("userRecipe");
    localStorage.removeItem("cart");
    window.location.href = "/login";
  };
  const login = () => {
    window.location.href = "/login";
  };
  return (
    <div>
      <Nav>
        <div
          style={{
            display: "flex",
            color: " #fff",
            textShadow:
              "3px 3px 20px #FFB000, -2px 1px 30px #FFB000,3px 3px 20px #FFB000, -2px 1px 30px #FFB000",
            fontSize: "2.5rem",
            alignItems: "center",
          }}
        >
          <GiKnifeFork />
          <Logo to={"/"}>Delicious</Logo>
        </div>
        <div>
          {userId ? (
            <div>
              {user
                .filter((obj) => obj.uid == userId.user.uid)
                .map((item, index) => {
                  return (
                    <div
                      className="profile-container"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                      key={index}
                    >
                      <img
                        key={index}
                        alt="preview image"
                        src={item.photo}
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "50%",
                          boxShadow:
                            "0px 0px 20px #FFB000, 0px 0px 30px #FFB000",
                        }}
                        className="profile"
                        onClick={() => (openPro ? SetPro(false) : SetPro(true))}
                      />
                      {openPro && (
                        <div
                          className="profile-view"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "500",
                              color: "#fff",
                              textShadow:
                                "2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            {item.name}
                          </h3>
                          <button
                            className="btn"
                            style={{
                              width: "100%",
                              color: "white",
                              backgroundColor: " red",
                              border: "none",
                              paddingBlock: "0.5rem",
                              borderRadius: "5px",
                              fontWeight: "500",
                            }}
                            onClick={logout}
                          >
                            logout
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ) : (
            <Link to={"/login"}>login</Link>
          )}
        </div>
      </Nav>
      <Search />
      <Category />
      <div className="content">{children}</div>
    </div>
  );
};
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-family: "Lobster Two", cursive;
  font-weight: 400;
  /* color: #313131; */
`;
const Nav = styled.div`
  height: 10rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

export default HomeMain;
