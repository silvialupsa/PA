import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import PositionTable from "../Components/PositionTable";

const fetchPositions = () => {
  return fetch("/api/positions/").then((res) => res.json());
};


const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState(null);


  useEffect(() => {
    fetchPositions().then((positions) => {
      setLoading(false);
      setPositions(positions);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <PositionTable positions={positions} />
    </div>
  );
};

export default EmployeeList;
