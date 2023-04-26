import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import Pagination from "./Pagination";
import SearchAndSortInputs from "./SearchAndSortInputs";

const fetchEmployees = () => {
  return fetch("/api/missing").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const MissingList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [copyEmployees, setCopyEmployees] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isMissing, setIsMissing] = useState(false)
  const [pageNumber, setPageNumber] = useState(1);

  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      setEmployees(employees);
      setCopyEmployees(employees);
    });
  }, [isMissing]);

  if (loading) {
    return <Loading />;
  }

  const filterEmployees = (e) => {
    setInputText(e.target.value);
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

  const handleAttendance = (employee) => {
    employee.present = !employee.present;
    setIsMissing(!isMissing)
    updateEmployee(employee);
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

   const incrementPage = () => {
     if (pageNumber * 10 >= employees.length) return;
     setPageNumber(pageNumber + 1);
   };

   const decrementingPage = () => {
     if (pageNumber > 1) {
       setPageNumber(pageNumber - 1);
     }
  };
  
  return (
    <div>
      <SearchAndSortInputs
        inputText={inputText}
        filterEmployees={filterEmployees}
        sortEmployees={sortEmployees}
      />
      <EmployeeTable
        employees={employees.slice((pageNumber - 1) * 10, pageNumber * 10)}
        onDelete={handleDelete}
        handleAttendance={handleAttendance}
      />
      <Pagination
        incrementPage={incrementPage}
        decrementingPage={decrementingPage}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default MissingList;
