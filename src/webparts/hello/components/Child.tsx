import * as React from "react";
import { spfi } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import { IFAQ } from "../../../Interfaces";
import { testContext } from "./App";

interface IHelloProps {
  sp: ReturnType<typeof spfi>;
}

const Child: React.FC<IHelloProps> = ({ sp }) => {
  const [items, setItems] = React.useState<IFAQ[]>([]);
  const [choices, setChoices] = React.useState<string[]>([]);
  const [updatingIte, seUpdatingItem] = React.useState<IFAQ>({
    ID: 0,
    GUID: "",
    Title: "",
    Body: "",
    Letter: "",
    isEdit: false,
  });

  const { getChoiceOptions, UpdateData } = React.useContext(testContext);
  const fetchItems = async () => {
    try {
      const items = await sp.web.lists.getByTitle("FAQ").items();
      console.log(items);
      let res = items.map((x: IFAQ) => ({ ...x, isEdit: false }));
      setItems(res);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  React.useEffect(() => {
    fetchItems();
    getChoiceOptions("FAQ", "Letter").then((x: string[]) => setChoices(x));
  }, []);

  function enableEdit(id: string) {
    const dummy = items.map((x) =>
      x.GUID === id ? { ...x, isEdit: true } : { ...x, isEdit: false }
    );
    setItems(dummy);
  }

  return (
    <ul>
      {items.map((i) => (
        <>
          <li>
            {!i.isEdit ? (
              <span onDoubleClick={() => {enableEdit(i.GUID);
                seUpdatingItem(i);
              }}>{i.Title}</span>
            ) : (
              <input
                type="text"
                defaultValue={i.Title}
                onChange={(e) => {
                  seUpdatingItem((z) => ({
                    ...z,
                    Title: e.target.value,
                    isEdit: true,
                  }));
                }}
              />
            )}
          </li>
          <ul>
            <li>
              {!i.isEdit ? (
                <span>{i.Body}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={i.Body}
                  onChange={(e) => {
                    seUpdatingItem((z) => ({
                      ...z,
                      Body: e.target.value,
                      isEdit: true,
                    }));
                  }}
                />
              )}
            </li>
            <ul>
              <li>
                {!i.isEdit ? (
                  <span>{i.Letter}</span>
                ) : (
                  <select
                    value={updatingIte.Letter}
                    onChange={(e) => {
                      seUpdatingItem((z) => ({
                        ...z,
                        Letter: e.target.value,
                        isEdit: true
                      }));
                    }}
                  >
                    {choices.map((y) => (
                      <option value={y}>{y}</option>
                    ))}
                  </select>
                )}
              </li>
            </ul>
          </ul>
          <li style={{ listStyleType: "none" }}>
            {i.isEdit && (
              <button
                onClick={async () => {
                  await UpdateData({...updatingIte,ID:i.ID});
                  fetchItems();
                  seUpdatingItem({
                    ID: 0,
                    GUID: "",
                    Title: "",
                    Body: "",
                    Letter: "",
                    isEdit: false,
                  });
                }}
              >
                Update
              </button>
            )}
          </li>
        </>
      ))}
    </ul>
  );
};

export default Child;
