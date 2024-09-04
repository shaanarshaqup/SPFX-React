import * as React from 'react';
import { spfi } from '@pnp/sp';
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import { BrowserRouter as Router,Route,Routes, Link } from 'react-router-dom';
import Home from './Home';
import Child from './Child';
// import { IFAQ } from '../../../Interfaces';

interface IHelloProps {
  sp: ReturnType<typeof spfi>;
}

const Hello: React.FC<IHelloProps> = ({ sp }) => {
  // const navigate = useNavigate();
  // const [items, setItems] = React.useState<IFAQ[]>([]);

  // React.useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const items = await sp.web.lists.getByTitle('FAQ').items();
  //       console.log(items)
  //       setItems(items);
  //     } catch (error) {
  //       console.error("Error fetching items:", error);
  //     }
  //   };

  //   fetchItems();
  // }, [sp]);

  return (<Router>
    <h1>FAQ List</h1>
    {/* <button onClick={()=>navigate("/child")}>bhxzjczb</button> */}
    <Link to={"/"}>Hi</Link>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/child" element={<Child sp={sp}/>}/>
    </Routes>
  </Router>
  );
}

export default Hello;
