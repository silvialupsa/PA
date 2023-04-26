import { Link} from "react-router-dom";
import "./EmployeeTable.css";
import { useParams } from "react-router";

const EmployeeTable = ({
  employees,
  onDelete,
  handleAttendance,
  handleHeight
}) => {

  const {column, sortOrder } = useParams();
  
  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Present</th>
            <th>
              {sortOrder === "desc" && column === "name" ? (
                <Link to={`/name/asc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-asc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              ) : (
                <Link to={`/name/desc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-desc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              )}
              Name
            </th>
            <th>
              {sortOrder === "desc" && column === "level" ? (
                <Link to={`/level/asc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-asc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              ) : (
                <Link to={`/level/desc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-desc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              )}
              Level
            </th>
            {/* <th> */}
            {/* {sortOrder === "desc" && column === "position" ? (
                <Link to={`/position/asc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-asc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              ) : (
                <Link to={`/position/desc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-desc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              )}
              Position
            </th> */}
            <th>
              {sortOrder === "desc" && column === "equipment" ? (
                <Link to={`/equipment/asc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-asc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              ) : (
                <Link to={`/equipment/desc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-desc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              )}
              Equipment
            </th>
            <th>
              {sortOrder === "desc" && column === "brand" ? (
                <Link to={`/brand/asc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-asc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              ) : (
                <Link to={`/brand/desc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-desc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              )}
              Brand
            </th>
            <th>
              {sortOrder === "desc" && column === "color" ? (
                <Link to={`/color/asc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-asc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              ) : (
                <Link to={`/color/desc`}>
                  <button>
                    <i
                      className="fa fa-sort-alpha-desc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              )}
              Favorite color
            </th>
            {/* <th>
              {sortOrder === "desc" && column === "salary" ? (
                <Link to={`/salary/asc`}>
                  <button>
                    <i
                      className="fa fa-sort-numeric-asc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              ) : (
                <Link to={`/salary/desc`}>
                  <button>
                    <i
                      className="fa fa-sort-numeric-desc"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                </Link>
              )}
              Salary
            </th> */}
            {/* <th>Years of experience</th> */}
            {/* <th>City</th>
            <th>Country</th> */}
            <th>
              <button onClick={()=>handleHeight(employees)}>
                <i className="fa fa-random"></i>
              </button>
              Height
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleAttendance(employee)}
                  defaultChecked={employee.present}
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.position.name}</td>
              <td>{employee.equipment.name}</td>
              <td>{employee.brand.name}</td>
              <td>{employee.color.name}</td>
              {/* <td>{employee.yearsOfExperience}</td> */}
              {/* <td>{employee.location.city}</td> */}
              {/* <td>{employee.location.country}</td> */}
              <td>{employee.height}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
