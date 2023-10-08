/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import MyContext from "./myContext";
import { fireDB } from "../../firebase/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";

const MyState = (props) => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  //value
  const value = {
    loading,
    setLoading,

    user,
  };

  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};

export default MyState;
