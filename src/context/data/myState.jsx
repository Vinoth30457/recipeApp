/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import MyContext from "./myContext";
import { fireDB } from "../../firebase/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

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
      // console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (recipe) => {
    dispatch(addToCart(recipe));
    // setFav(false);

    toast.success("Favorite added");
  };
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));

    toast.success("Deleted from Favorite");
  };
  const [item, setItem] = useState([]);
  useEffect(() => {
    let cart = [...new Set(cartItems)];

    // console.log(cart);
    localStorage.setItem("fav", JSON.stringify(cart));
    let fav = JSON.parse(localStorage.getItem("fav"));
    setItem(fav);
  }, [cartItems]);
  console.log(item);
  const userId = JSON.parse(localStorage.getItem("userRecipe"));

  //value
  const value = {
    loading,
    setLoading,
    user,
    addCart,
    deleteCart,
    userId,
    item,
  };

  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};

export default MyState;
