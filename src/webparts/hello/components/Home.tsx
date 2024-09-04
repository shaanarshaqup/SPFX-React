import * as React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigete = useNavigate();

  return (
    <>
    <h1>
        Parent
    </h1>
      <button onClick={() => navigete("/child")}>child</button>
    </>
  );
};

export default Home;
