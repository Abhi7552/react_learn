import { useState,useEffect } from "react";
import {useDispatch} from 'react-redux';
import authService from "./appwrite/auth";
import { login,logout } from "./store/authSlice";
import { Footer, Header } from "./components";

function App() {
  const [loding, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        }else{
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  
  return !loding ? (
    <div className="App">
      {/* Your application components go here */}
      <h1>Welcome to the Blog</h1>
      <Header />
      <main>
        {/* <Outlet/> */}
      </main>
      <Footer />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App
