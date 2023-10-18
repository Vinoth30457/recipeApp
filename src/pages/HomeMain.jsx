import React, { useContext, useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Search from "../components/Search";
import Category from "../components/Category";
import Footer from "../components/footer/Footer";

import myContext from "../context/data/myContext";

const HomeMain = ({ children }) => {
  const context = useContext(myContext);
  const { user, mode } = context;
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
      <div style={{ margin: "0 20%" }}>
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
                          onClick={() =>
                            openPro ? SetPro(false) : SetPro(true)
                          }
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
      <footer
        className="body-font "
        style={{
          background: mode === "dark" ? "rgb(30, 41, 59)" : "red",
        }}
      >
        {/* Left Content  */}
        <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
          {/* Blog Logo  */}
          <div className="flex title-font font-medium items-center md:justify-start justify-center text-white-900">
            {/* logo  */}
            {/* <img
              className="w-10"
              src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png"
              alt="logo"
            /> */}
            {/* logo text  */}
            <span className="ml-3 text-xl text-white flex items-center">
              <GiKnifeFork />
              <Logo to={"/"}>Delicious</Logo>
            </span>
          </div>

          {/* items  */}
          <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2023 Delicious —
            <a
              href="https://twitter.com/knyttneve"
              className="text-white-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @recipeapp
            </a>
          </p>

          {/* Right item  */}
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            {/* Icon 1  */}
            <a className="text-white">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>

            {/* Icon 2  */}
            <a className="ml-3 text-white">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>

            {/* Icon 3  */}
            <a className="ml-3 text-white">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>

            {/* Icon 4  */}
            <a className="ml-3 text-white">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />
                <circle cx={4} cy={4} r={2} stroke="none" />
              </svg>
            </a>
          </span>
        </div>
      </footer>
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
