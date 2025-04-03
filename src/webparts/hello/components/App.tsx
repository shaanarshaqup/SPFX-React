import * as React from "react";
import { spfi } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/fields";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Child from "./Child";
import AddToList from "./AddToList";
import { IFAQ } from "../../../Interfaces";
// import { IFAQ } from '../../../Interfaces';

interface IHelloProps {
  sp: ReturnType<typeof spfi>;
}

export const testContext = React.createContext<any>(null);

const App: React.FC<IHelloProps> = ({ sp }) => {

  const addItemToList = async (listTitle: string, item: IFAQ) => {
    try {
      const addedItem = await sp.web.lists
        .getByTitle(listTitle)
        .items.add({ Title: item.Title, Body: item.Body, Letter: item.Letter });
      alert("added to list")
      console.log("Item added successfully", addedItem);
    } catch (error) {
      console.error("Error adding item to list", (error as Error).message);
    }
  };

  async function getChoiceOptions(listName: string, listColumn: string) {
    try {
      const field = await sp.web.lists.getByTitle(listName).fields.getByTitle(listColumn)();
      const choices = field.Choices;
      return choices;
    } catch (error) {
      console.error("Error fetching choices:", error);
      return [];
    }
  }

  const UpdateData = async (data: IFAQ) => {
    try {
      console.log("................................");
      console.log(data);

      if (data.isEdit === true) {
        // Ensure 'Title' field is correctly spelled
        await sp.web.lists.getByTitle('FAQ').items.getById(data.ID).update({
          Title: data.Title,
          Body: data.Body,
          Letter: data.Letter
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    #O365_NavHeader, #SuiteNavPlaceHolder, 
    #spSiteHeader, .ms-HubNav, 
    .ms-compositeHeader, #spSiteFooter {
      display: none !important;
    }
      
    *{
    margin:0;
    padding:0;
    }
  `;
    document.head.appendChild(style);
  }, [])

  return (
    <Router>
      <div style={{ height: "100vh", overflow: "auto" }}>
        <span></span>
        <h1 style={{ color: "green" }}>FAQ List</h1>
        {/* <button onClick={()=>navigate("/child")}>bhxzjczb</button> */}
        <Link to={"/"}>Hi</Link>
        <testContext.Provider value={{ addItemToList, getChoiceOptions, UpdateData }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/child" element={<Child sp={sp} />} />
            <Route path="/add" element={<AddToList />} />
          </Routes>
        </testContext.Provider>
      </div>
    </Router>
  );
};

export default App;
