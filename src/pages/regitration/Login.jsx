import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader";
import myContext from "../../context/data/myContext";

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Signin Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      window.location.href = "/";
      setLoading(false);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error(`No user associated with this email`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err.code === "auth/wrong-password") {
        toast.error(`incorrect Password`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err.code === "auth/invalid-email") {
        toast.error("Enter all fields", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err.code === "auth/missing-password") {
        toast.error("Enter Password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      setLoading(false);
      // alert("Login Failed");
      console.log(err.code);
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
            onClick={signin}
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don&#39;t have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
        <div
          className="credential"
          style={{ color: "white", marginTop: "1rem" }}
        >
          <hr style={{ marginBottom: "1rem" }} />

          <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
            {" "}
            User credential{" "}
          </h1>
          <p>Email : vinoth@gmail.com</p>
          <p>Password : Vinoth@238</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

// const Login = () => {
//   return <div>Login</div>;
// };

// export default Login;
