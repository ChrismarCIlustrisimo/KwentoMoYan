import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Feed = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);  // runs once when component mounts

  return (
    <div>
      <Navbar />
      FEED
    </div>
  );
};

export default Feed;
