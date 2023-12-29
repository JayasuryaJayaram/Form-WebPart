// spservice.ts
import { addSP } from "../components/pnpjsConfig";

export const addAnswer = async (answer: string) => {
  try {
    const sp = addSP();

    // spservice.ts
    return await sp.web.lists
      .getByTitle("Form_Answers")
      .items.add({
        // Use the correct internal name for the 'Answer' field
        Answer: answer,
      })
      .then((res) => console.log("data submitted"))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error("Error adding answer:", error);
    throw error; // Rethrow the error to propagate it to the calling function
  }
};

export const getQuestions = async () => {
  try {
    const sp = addSP();

    const items = await sp.web.lists
      .getByTitle("Form_Questions")
      .items.getAll();
    return items;
  } catch (error) {
    console.error("Error getting questions:", error);
    throw error; // Rethrow the error to propagate it to the calling function
  }
};
