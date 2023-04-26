import { Link } from "react-router-dom";
import "./PositionTable.css";

const PositionTable = ({ positions, onDelete }) => (
  <div className="PositionTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((equipment) => (
          <tr key={equipment._id}>
            <td>{equipment.name}</td>
            <td>{equipment.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PositionTable;
