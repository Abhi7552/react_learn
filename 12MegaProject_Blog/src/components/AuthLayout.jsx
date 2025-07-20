import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Protected({ children , authentication=true}) {

    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loader, setLoader] = useState(true);
    
    useEffect(() => {
        if (authentication && authStatus != authentication) {
            navigate("/login");
        } else if (!authentication && authStatus != authentication) {
            navigate("/");
        } else {
            setLoader(false);
        }
    }, [authStatus, authentication, navigate]);

  return loader ? (
    <div className="flex justify-center items-center h-screen">
      <div className="loader">Loading</div>
    </div>
  ) : (
    children
  );
}

 