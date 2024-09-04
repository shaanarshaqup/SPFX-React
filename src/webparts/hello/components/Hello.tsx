// import * as React from "react";
// import { SPFI } from "@pnp/sp";
// import { IHelloProps } from "./IHelloProps";
// import { getSP } from "../../../pnpjsConfig"; // Assuming you have this file configured
// import "@pnp/sp/webs";
// import "@pnp/sp/lists"; 
// import "@pnp/sp/items";

// const Hello: React.FC<IHelloProps> = (props) => {
//   const Last_Name = "FAQ"; // List name
//   const _sp: SPFI | null = getSP(props.context); // Get the SPFI instance

//   const [faqItems, setFaqItems] = React.useState<any[]>([]); // State to store the list items

//   // Function to fetch the FAQ items
//   const getFaqItemsAsync = async () => {
//     if (_sp) { // Check if _sp is not null
//       try {
//         const items = await _sp.web.lists.getByTitle(Last_Name).items();
//         setFaqItems(items); // Update state with the fetched items
//         console.log("items", items); // Log items for debugging
//       } catch (error) {
//         console.error("Error fetching FAQ items:", error); // Log any errors
//       }
//     } else {
//       console.error("SPFI instance is null.");
//     }
//   };

//   // Fetch items when component mounts
//   React.useEffect(() => {
//     getFaqItemsAsync();
//   }, []);

//   return (
//     <div>
//       <h1>FAQ Items</h1>
//       <ul>
//         {faqItems.map((item) => (
//           <li key={item.Id}>{item.Title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Hello;


import { SPFI } from "@pnp/sp";
import * as React from "react";
import { IHelloProps } from "./IHelloProps";
import { getSP } from "../../../pnpjsConfig";
import "@pnp/sp/webs";  // Import to extend SPFI with webs
import "@pnp/sp/lists"; // Import to extend SPFI with lists
import "@pnp/sp/items";

const Hello = (props: IHelloProps) => {
  const listName = "FAQ";
  const _sp: SPFI = getSP(props.context);

  const getFaqItemsAsync = async () => {
    try {
      const items = await _sp.web.lists.getByTitle(listName).items();
      console.log("items", items);
    } catch (error) {
      console.error("Error fetching list items:", error);
    }
  };

  React.useEffect(() => {
    getFaqItemsAsync();
  }, []);

  return (
    <>
      <h1>FAQ List</h1>
    </>
  );
};

export default Hello;
