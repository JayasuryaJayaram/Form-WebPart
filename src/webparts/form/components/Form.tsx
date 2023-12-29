import * as React from "react";
import { IFormProps } from "./IFormProps";
import { useEffect, useState } from "react";
import { addAnswer, getQuestions } from "../service/spservice";
import styles from "./Form.module.scss";
import { Button, Modal } from "antd";

export const Form = (props: IFormProps) => {
  const [list, setList] = useState<any[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [isAnswerEmpty, setIsAnswerEmpty] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Update the onChange event handler for the input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAnswer(inputValue);
    setIsAnswerEmpty(inputValue.trim() === ""); // Check if the input value is empty after trimming whitespace
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await getQuestions();
        setList(data);
      } catch (error) {
        console.error("Error fetching question items:", error);
      }
    };

    fetchData();
  }, []);

  const handleAnswerSubmit = async () => {
    try {
      await addAnswer(answer);
      setIsModalVisible(true); // Show modal upon successful submission
      // Fetch and update the questions list after submitting the answer
      const data = await getQuestions();
      setList(data);
      setAnswer(""); // Clear the answer input after submission
      setIsAnswerEmpty(true); // Reset the answer empty state
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.column1}>
          <img
            src={require("../assets/Form_img.svg")}
            alt="image should be here"
            style={{ marginBottom: "30px" }}
          />
          <p className={styles.header}>Share without revealing</p>
          <p className={styles.description}>
            Your thoughts, your voice, your anonymity
          </p>
        </div>
        <div className={styles.column2}>
          <div>
            <h3 className={styles.formTitle}>Anonymous Suggestion</h3>
          </div>
          {list.map((q: any) => (
            <section key={q.Id}>
              <div style={{ marginTop: "54px" }}>
                <label className={styles.labelStyle}>
                  {q.Q_No}.{q.Questions}
                </label>
              </div>
              <div style={{ marginTop: "26px" }}>
                <input
                  type="text"
                  value={answer}
                  placeholder="Enter your answer"
                  className={styles.inputField}
                  onChange={handleInputChange}
                />
              </div>
            </section>
          ))}
          <div style={{ marginTop: "40px" }}>
            <Button
              type="primary"
              onClick={handleAnswerSubmit}
              disabled={isAnswerEmpty}
              style={{ color: "#283657", backgroundColor: "#fff" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </section>
      {/* Ant Design Modal for success message */}
      <Modal
        title="Successfully submitted!.."
        visible={isModalVisible}
        onCancel={handleModalOk}
        footer={[
          // Customizing the footer with only the 'OK' button
          <Button key="submit" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <p>Your response is submitted anonymously.</p>
      </Modal>
    </>
  );
};
