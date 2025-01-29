import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const Profile = () => {
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { adminId } = useParams();

  useEffect(() => {
    if (!adminId || isNaN(adminId)) {
      setError("Invalid admin ID.");
      setLoading(false);
      return;
    }

    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/profile/${adminId}`
        );
        setAdmin(response.data.data || {});
      } catch (err) {
        setError("Failed to fetch admin details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [adminId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container text-center mt-5">
      <h4>Admin Management System</h4>
      <div className="d-flex flex-column align-items-center">
        <div className="mb-4">
          <img
            src={"http://localhost:3000/Images/" + admin.image}
            alt="Admin"
            className="img-fluid rounded-circle shadow"
            style={{ width: "350px", height: "350px", marginTop: "-40px", objectFit:"cover"}}
          />
        </div>
        <h3 className="text-white">Name: {admin.name}</h3>
        <h3 className="text-white">Email: {admin.email}</h3>
        <h3 className="text-white">
          Date of Birth: {new Date(admin.dob).toLocaleDateString("en-CA")}
        </h3>
        <h3 className="text-white">Address: {admin.address}</h3>
      </div>
    </div>
  );
};

export default Profile;
