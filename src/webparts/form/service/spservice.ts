import { getSP } from "../components/pnpjsConfig";

export const getListItems = async () => {
  let sp = getSP();
  return await sp.web.lists
    .getByTitle("Form_Questions")
    .items.getAll()
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
