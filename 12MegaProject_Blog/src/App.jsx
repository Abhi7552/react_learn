import { useState,useEffect } from "react";
import {useDispatch} from 'react-redux';
import authService from "./appwrite/auth";
import { login,logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   authService.getCurrentUser()
  //     .then((user) => {
  //       if (user) {
  //         dispatch(login(user));
  //       }else{
  //         dispatch(logout());
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching current user:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [dispatch]);

  useEffect(() => {
  authService.getCurrentUser()
    .then((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      // Only log unexpected errors
      if (!error.message?.includes("missing scope")) {
        console.error("Error fetching current user:", error);
      }
      dispatch(logout());
    })
    .finally(() => {
      setLoading(false);
    });
}, [dispatch]);
  
  return !loading ? (
    <div className="App">
      <Header />
      <main>
        <h1>Welcome to the Blog</h1>
        {/* Nested routes will render here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App
