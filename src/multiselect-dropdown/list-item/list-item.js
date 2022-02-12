import React from "react";
import styles from "./list-item.module.css";

const ListItem = ({ item, displayKey, setSelected }) => {
  return (
    <div
      key={item[displayKey]}
      className={styles.dropdownItem}
      onClick={() => setSelected(item)}
    >
      {item[displayKey]}
    </div>
  );
};

export default ListItem;
