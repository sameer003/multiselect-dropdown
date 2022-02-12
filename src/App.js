import { useState } from "react";
import MultiselectDropdown from "./multiselect-dropdown/multiselect-dropdown";
import "./App.css";

const options = [
  { craft: "ISS", name: "Mark Vande Hei" },
  { craft: "ISS", name: "Pyotr Dubrov" },
  { craft: "ISS", name: "Anton Shkaplerov" },
  { craft: "Shenzhou 13", name: "Zhai Zhigang" },
  { craft: "Shenzhou 13", name: "Wang Yaping" },
  { craft: "Shenzhou 13", name: "Ye Guangfu" },
  { craft: "ISS", name: "Raja Chari" },
  { craft: "ISS", name: "Tom Marshburn" },
  { craft: "ISS", name: "Kayla Barron" },
  { craft: "ISS", name: "Matthias Maurer" },
];

function App() {
  const [selectedValues, setSelectedValues] = useState([
    "Raja Chari",
  ]);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValues([...selectedList]);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedValues([...selectedList]);
  };
  return (
    <div className="App">
      <h3>Example 1: Basic</h3>
      <MultiselectDropdown
        width="350px" 
        options={options} 
        minimumSearchLength={1}
      />
      <h3>Example 2: Pre-Selected with Minimun 3 seatch characters</h3>
      <MultiselectDropdown
        width="400px" // with of dropdown
        options={options} // Options for the dropdown
        selectedValues={selectedValues} // Pre-selected value to show in selected
        onSelect={onSelect} // Function will fire on select event
        onRemove={onRemove} // Function will fire on remove event
        displayKey="name" //Property to display
        valueKey="name" //Property to use as a value
        searchPlaceholder="+Add Item" // Search Placeholder
        minimumSearchLength={3} // Min character for filter
      />
    </div>
  );
}

export default App;
