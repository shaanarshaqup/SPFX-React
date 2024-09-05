import * as React from "react";
import { testContext } from "./App";
// import { IFAQ } from "../../../Interfaces";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// interface IFAQAdd{

// }

const AddToList: React.FC = () => {
  const [choices, setChoices] = React.useState<string[]>([]);
  const [data, setData] = React.useState({
    Title: "",
    Body: "",
    Letter: "",
    isEdit:false
  });

  const { addItemToList, getChoiceOptions } = React.useContext(testContext);

  React.useEffect(() => {
    getChoiceOptions("FAQ", "Letter").then((x: string[]) => setChoices(x));
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addItemToList("FAQ", data);
      }}
    >
      <input
        type="text"
        onChange={(e) => setData((x) => ({ ...x, Title: e.target.value }))}
        placeholder="Enter Title"
      />
      <input
        type="text"
        onChange={(e) => setData((x) => ({ ...x, Body: e.target.value }))}
        placeholder="Enter Body"
      />
      {/* <input
        type="text"
        onChange={(e) => setData((x) => ({ ...x, Letter: e.target.value }))}
        placeholder="Enter Letter"
      /> */}
      <select
        value={data.Letter}
        onChange={(e) => setData((x) => ({ ...x, Letter: e.target.value }))}
      >
        {choices.map((choice, index) => (
          <option key={index} value={choice}>
            {choice}
          </option>
        ))}
      </select>
      <button type="submit">submi</button>
    </form>
  );
};

export default AddToList;
