## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `Usage`

      <MultiselectDropdown
        width="400px" // with of dropdown
        options={options} // Options for the dropdown
        selectedValues={selectedValues} // Pre-selected value to show in selected
        onSelect={onSelect} // Function to fire on select event
        onRemove={onRemove} // Function to fire on remove event
        displayKey="name" //Property to display
        valueKey="name" //Property to use as a value
        searchPlaceholder="+Add Item" // Search Placeholder
        minimumSearchLength={3} // Min character for filter
      />

