import React, { useState, useEffect, useRef } from "react";
import styles from "./multiselect-dropdown.module.css";
import Chip from "./chip/chip";
import ListItem from "./list-item/list-item";

const sortList = (list, sortOn) => {
  return list.sort((a, b) => (a[sortOn] > b[sortOn] ? 1 : -1));
};

const MultiselectDropdown = ({
  options = [],
  selectedValues = [],
  onSelect,
  onRemove,
  displayKey = "name",
  valueKey = "name",
  width = "350px",
  searchPlaceholder = "+Add Item",
  minimumSearchLength = 3,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [list, setList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Initialize the pre-selected items
    if (!initialized && selectedValues.length && !selectedItems.length) {
      setInitialized(true);
      setSelectedItems([...selectedValues]);
    }
  }, [selectedValues, selectedItems, initialized]);

  // Sort the options alphabatically
  useEffect(() => {
    const sortedList = sortList(options, displayKey);
    setList(sortedList);
  }, [options, displayKey]);

  // Set the selected items
  const setSelected = (value) => {
    const newSelectedItems = [...selectedItems, value[valueKey]];
    setSelectedItems(newSelectedItems);
    setShowDropdown(false);
    setSearch("");

    // if on Select is present fire it
    if (onSelect) {
      onSelect(newSelectedItems, value);
    }
  };

  // Remove from the selected items
  const onDeSelect = (value) => {
    const newSelectedItems = selectedItems.filter((item) => item !== value);
    setSelectedItems(newSelectedItems);
    setSearch("");

    // if on onRemove is present fire it
    if (onRemove) {
      onRemove(newSelectedItems, value);
    }
  };

  useEffect(() => {
    // hide dropdown if clicked outside from input/dropdown
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
          return;
        }
        setShowDropdown(false);
      }
    };
    // listener to mousedown
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, dropdownRef]);

  // Set Filter Value
  const filterItems = (e) => {
    setSearch(e.target.value);
  };

  // Show items which are not selected
  // Plus filter item if search is greater than or equals minimumSearchLength
  const filterListItem = (item, text) => {
    if (selectedItems.find((value) => value === item[valueKey])) {
      return false;
    }
    if (text.length < minimumSearchLength) {
      return true;
    }
    return item[displayKey].toLowerCase().indexOf(text.toLowerCase()) > -1;
  };

  return (
    <div className={styles.container} style={{ width }}>
      <div className={styles.content} onClick={() => {inputRef.current.focus()}}>
        {selectedItems.map((item) => {
          return (
            <Chip
              key={item}
              item={item}
              onDeSelect={onDeSelect}
              list={list}
              valueKey={valueKey}
              displayKey={displayKey}
            />
          );
        })}

        <input
          placeholder={searchPlaceholder}
          value={search}
          ref={inputRef}
          onFocus={() => setShowDropdown(true)}
          onChange={filterItems}
          className={styles.input}
        />
      </div>
      {showDropdown && (
        <div className={styles.dropdown} ref={dropdownRef}>
          {list
            .filter((item) => filterListItem(item, search))
            .map((item) => {
              return (
                <ListItem
                  key={item[displayKey]}
                  item={item}
                  displayKey={displayKey}
                  setSelected={setSelected}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MultiselectDropdown;
