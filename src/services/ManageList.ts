// import { spfi, SPFx } from "@pnp/sp";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import { WebPartContext } from "@microsoft/sp-webpart-base";

// const sp = spfi().using(SPFx(this.context));

// const addItemToList = async (listTitle: string, item: any) => {
//   try {
//     const addedItem = await sp.web.lists.getByTitle(listTitle).items.add(item);
//     console.log("Item added successfully", addedItem);
//   } catch (error) {
//     console.error("Error adding item to list", error);
//   }
// };