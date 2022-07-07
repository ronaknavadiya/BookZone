import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const HomePage = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <div>HomePage</div>;
};

export default HomePage;
