import { useEffect, useState} from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeSearch = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [copyEmployees, setCopyEmployees] = useState(null);
  const [inputText, setInputText] = useState("")
  const { search } = useParams();
  
  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      const searchedEmployees = employees.filter(employee => employee.name.toLowerCase().includes(search.toLowerCase()))
      setEmployees(searchedEmployees);
      setCopyEmployees(searchedEmployees);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const filterEmployees = (e) => {
    setInputText(e.target.value)
    e.preventDefault();
    const filteredEmployees = copyEmployees.filter(
      (employee) =>
        employee.position
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        employee.level.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setEmployees(filteredEmployees);
  };


  const sortEmployees = (e) => {
    const option = e.target.value;
    if (option === "level") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.level.localeCompare(b.level))
      );
    } else if (option === "position") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.position.localeCompare(b.position))
      );
    } else if (option === "firstName") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (option === "lastName") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => {
          const aLast = a.name.split(" ")[a.name.split(" ").length - 1];
          const bLast = b.name.split(" ")[b.name.split(" ").length - 1];
          return aLast.localeCompare(bLast);
        })
      );
    } else if (option === "middleName") {
      setEmployees((previous) =>
        [...previous].sort((a, b) => {
          const aMiddle =
            a.name.split(" ")[a.name.split(" ").length > 2 ? 1 : 1];
          const bMiddle =
            b.name.split(" ")[b.name.split(" ").length > 2 ? 1 : 1];
          return aMiddle.localeCompare(bMiddle);
        })
      );
    }
   };

  return (
    <div>
      <input
        type="text"
        onChange={filterEmployees}
        value={inputText}
        placeholder="Search by position or level"
      ></input>
      <select onChange={sortEmployees} id="sort">
        <option value="" selected="true" disabled="disabled">
          --Sort by--
        </option>
        <option value="firstName">first name</option>
        <option value="lastName">last name</option>
        <option value="middleName">middle name</option>
        <option value="position">position</option>
        <option value="level">level</option>
      </select>
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeSearch;