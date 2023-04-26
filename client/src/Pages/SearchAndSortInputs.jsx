const SearchAndSortInputs = ({ inputText, filterEmployees, sortEmployees }) => {
  return (
    <div>
      <input
        type="text"
        onChange={filterEmployees}
        value={inputText}
        placeholder="Search by position or level"
      ></input>
      <select onChange={sortEmployees} id="sort">
        <option value="" selected={true} disabled="disabled">
          --Sort by--
        </option>
        <option value="firstName">first name</option>
        <option value="lastName">last name</option>
        <option value="middleName">middle name</option>
        <option value="position">position</option>
        <option value="level">level</option>
      </select>
    </div>
  );
};

export default SearchAndSortInputs;