import { useState, useEffect } from "react";
import "./EmployeeForm.css";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [equipments, setEquipments] = useState(null);
  const [brands, setBrands] = useState(null);
  const [colors, setColors] = useState(null);
  const [level, setLevel] = useState(employee ? employee.level : null);
  const [bookName, setBookName] = useState(null);
  const [bookAuthor, setBookAuthor] = useState(null);
  const [locations, setLocations] = useState(null)
  const [positions, setPositions] = useState(null)

  // const [employeeObject, setEmployeeObject] = useState(employee);
  function changeLevel(e) {
    const salary = e.target.value;
    if (1 <= salary && salary <= 100) {
      setLevel("Junior");
    } else if (101 <= salary && salary <= 300) {
      setLevel("Medior");
    } else if (301 <= salary && salary <= 400) {
      setLevel("Senior");
    } else if (401 <= salary && salary <= 800) {
      setLevel("Expert");
    } else if (801 <= salary) {
      setLevel("Godlike");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    // if (employee) {
    //   const newBook = [
    //     ...employee.readBooks,
    //     {
    //       name: newEmployee.name,
    //       author: newEmployee.author,
    //     },
    //   ];
    //   newEmployee.readBooks = newBook;
    // } else {
    //   const newBook = [
    //     {
    //       name: newEmployee.name,
    //       author: newEmployee.author,
    //     },
    //   ];
    //   newEmployee.readBooks = newBook;
    // }

    return onSave({ ...employee, readBooks: updatedReadBooks});
  };

  const fetchEquipments = () => {
    return fetch("/api/equipments/").then((res) => res.json());
  };

  const fetchBrands = () => {
    return fetch("/api/brands/").then((res) => res.json());
  };

  const fetchColors = () => {
    return fetch("/api/colors/").then((res) => res.json());
  };

   const fetchLocations = () => {
     return fetch("/api/locations/").then((res) => res.json());
  };

   const fetchPositions = () => {
     return fetch("/api/positions/").then((res) => res.json());
   };
  
  useEffect(() => {
    fetchEquipments().then((equipments) => {
      setEquipments(equipments);
    });
    fetchBrands().then((brands) => {
      setBrands(brands);
    });
    fetchColors().then((colors) => {
      setColors(colors);
    });
    fetchLocations().then((locations) => {
      setLocations(locations);
    });
    fetchPositions().then((positions) => {
      setPositions(positions);
    });
  }, []);

  // const changeEmployeeObject = (e) => {
  //
  //   if (employeeObject) {
  //     employeeObject.name = e.target.value;
  //     setEmployeeObject({ ...employeeObject });
  //   } else {
  //     setEmployeeObject({
  //       name: e.target.value
  //     })
  //   }
  // }

  // const isFormValid = () => {
  //   if (employeeObject && employeeObject.name) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  const handleBookName = (e) => {
    setBookName(e.target.value);
  };

  const handleBookAuthor = (e) => {
    setBookAuthor(e.target.value);
  };

  const newBook = {
    name: bookName,
    author: bookAuthor,
  };

  const updatedReadBooks = employee?.readBooks?.concat(newBook);


  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
          // className={!employeeObject?.name ? "borderRed" : ""}
          // onChange={changeEmployeeObject}
        />
      </div>

      {/* <div className="control">
        <label htmlFor="location">City:</label>
        <select name="location" id="location">
          <option value="" selected={true} hidden="disabled">
            Select a Location...
          </option>
          {locations?.map((location) => {
            return (
              <option
                // selected={employee?.location._id === location._id}
                key={location._id}
                value={location._id}
              >
                {location.city}, {location.country}
              </option>
            );
          })}
        </select>
      </div> */}

      <div className="control">
        <label htmlFor="position">Position:</label>
        <select name="position" id="position">
          <option value="" selected={true} hidden="disabled">
            Select a Position...
          </option>
          {positions?.map((position) => {
            return (
              <option
                selected={employee?.position._id === position._id}
                key={position._id}
                value={position._id}
              >
                {position.name}, {position.salary}
              </option>
            );
          })}
        </select>
      </div>

      {/* <div className="control">
        <label htmlFor="level">Level:</label>
        <input value={level} disabled={true} name="level" id="level" />
      </div> */}

      <div className="control">
        <label htmlFor="yearsOfExperience">Years of experience:</label>
        {employee?.level === "Junior" ? (
          <input
            disabled={true}
            defaultValue={employee ? employee.yearsOfExperience : null}
            name="yearsOfExperience"
            id="yearsOfExperience"
          />
        ) : (
          <input
            defaultValue={employee ? employee.yearsOfExperience : null}
            name="yearsOfExperience"
            id="yearsOfExperience"
          />
        )}
      </div>

      {/* <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div> */}

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select name="equipment" id="equipment">
          <option value="" selected={true} hidden={disabled}>
            Select an Equipment...
          </option>
          {equipments?.map((equipment) => {
            return (
              <option
                selected={employee?.equipment._id === equipment._id}
                key={equipment._id}
                value={equipment._id}
              >
                {equipment.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control">
        <label htmlFor="brand">Brand:</label>
        <select name="brand" id="brand">
          <option value="" selected={true} hidden="disabled">
            Select a Brand...
          </option>
          {brands?.map((brand) => {
            return (
              <option
                selected={employee?.brand._id === brand._id}
                key={brand._id}
                value={brand._id}
              >
                {brand.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control">
        <label htmlFor="color">Color:</label>
        <select name="color" id="color">
          <option value="" selected={true} hidden="disabled">
            Select a Color...
          </option>
          {colors?.map((color) => {
            return (
              <option
                selected={employee?.color._id === color._id}
                key={color._id}
                value={color._id}
              >
                {color.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          onChange={changeLevel}
          defaultValue={employee ? employee.salary : null}
          name="salary"
          id="salary"
        />
      </div> */}

      <details
        style={{
          backgroundColor: "rgb(99, 151, 254)",
          // display: "flex",
          // flexDirection: "row",
        }}
      >
        <summary
        // style={{ marginLeft: "15px", fontWeight: "bold" }}
        >
          Book(s):
        </summary>
        {employee?.readBooks?.length > 0
          ? employee.readBooks.map((book, _id) => {
              return (
                <div className="control" key={book._id}>
                  <label htmlFor="bookName">Book name:</label>
                  <input
                    disabled={true}
                    defaultValue={employee ? book.name : null}
                    name="bookName"
                    id="bookName"
                  />
                  <div className="control"></div>
                  <label htmlFor="author">Book author:</label>
                  <input
                    disabled={true}
                    defaultValue={employee ? book.author : null}
                    name="author"
                    id="author"
                  />
                </div>
              );
            })
          : null}
      </details>

      <div className="control">
        <label htmlFor="bookName">Book name:</label>
        <input
          value={bookName}
          onChange={handleBookName}
          name="bookName"
          id="bookName"
        />
        <div className="control"></div>
        <label htmlFor="author">Book author:</label>
        <input
          value={bookAuthor}
          onChange={handleBookAuthor}
          name="author"
          id="author"
        />
      </div>

      <div className="buttons">
        <button
          type="submit"
          // disabled={isFormValid()}
        >
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
