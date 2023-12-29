import * as React from "react";
import { IFormProps } from "./IFormProps";
import { useEffect, useState } from "react";
import { getListItems } from "../service/spservice";
import styles from "./Form.module.scss";

export const Form = (props: IFormProps) => {
  const [list, setlist] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let data = await getListItems();
      setlist(data);
    })();
  }, []);

  console.log(list);

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
          {list.map((item: any) => (
            <section>
              <div style={{ marginTop: "54px" }}>
                <label className={styles.labelStyle}>
                  {item.Q_No}.{item.Questions}
                </label>
              </div>
              <div style={{ marginTop: "26px" }}>
                <input
                  type="textarea"
                  placeholder="   Enter your answer"
                  className={styles.inputField}
                />
              </div>
            </section>
          ))}
          <div style={{ marginTop: "40px" }}>
            <button className={styles.submitButton}>Submit</button>
          </div>
        </div>
      </section>
    </>
  );
};
