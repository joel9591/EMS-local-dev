import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/detail/" + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" emp-bg">
      <div className="p-2 d-flex justify-content-center shadow text-black bg-success">
        <h4>Emoployee Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3 text-black ">
        <img
          src={"http://localhost:3000/Images/" + employee.image}
          className="emp_det_image"
          alt="Employee"
          style={{ width: "250px", height: "300px", objectFit: "cover" }}
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: {parseInt(employee.salary)}rs </h3>
          <h3>
            Date of Birth: {new Date(employee.dob).toLocaleDateString("en-GB")}
          </h3>
        </div>
        <div>
          <button className="btn btn-primary me-2" hidden>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
