import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        const response = await axios.get(`http://localhost:3000/auth/profile/${adminId}`);
        setAdmin(response.data.data || {});
      } catch (err) {
        setError("Failed to fetch admin details.");
        console.error("Error fetching admin:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [adminId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h4>Admin Management System</h4>
      <div>
        {admin.image && (
          <img
            src={`http://localhost:3000/Public/Images/${admin.image}`}
            alt="Admin"
          />
        )}
        <h3>Name: {admin.name}</h3>
        <h3>Email: {admin.email}</h3>
        <h3>Date of Birth: {admin.dob}</h3>
        <h3>Address: {admin.address}</h3>
      </div>
    </div>
  );
};

export default Profile;
