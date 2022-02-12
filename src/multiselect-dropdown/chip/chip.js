import React from "react";
import styles from "./chip.module.css";

const Chip = ({ item, onDeSelect, list, valueKey, displayKey }) => {
  // Get Display name for showing selected item
  const getDisplayName = (value) => {
    const item = list.find((item) => item[valueKey] === value);
    return item ? item[displayKey] : value;
  };

  return (
    <div className={styles.chip}>
      {getDisplayName(item)}
      <div onClick={() => onDeSelect(item)} className={styles.close}>
        +
      </div>
    </div>
  );
};

export default Chip;
