import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const EditAdmin = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/admins/${adminId}` // Adjust this if the route is different
        );
        if (response.data.Status) {
          setAdminName(response.data.Result.name);
          setAdminEmail(response.data.Result.email);
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmin();
  }, [adminId]);

  const handleNameChange = (e) => {
    setAdminName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setAdminEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/auth/edit/${adminId}`,
        {
          // Adjust URL to match backend
          name: adminName,
          email: adminEmail,
        }
      );

      if (response.data.message === "Admin updated successfully") {
        // Check message instead of Status
        alert("Admin updated successfully");
        navigate("/dashboard");
      } else {
        alert("Failed to update admin: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      alert("Failed to update admin: " + error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center " style={{paddingTop: '10%'}}>
      <form onSubmit={handleSubmit} className="text-white d-flex flex-column p-4 rounded border border-light" style={{ height: '40vh', width: '30vw', backgroundColor: "#343a40"}}>
        <div className="mb-3 w-100">
          <label htmlFor="Admin-name" className="form-label">Admin name</label>
          <input
            type="text"
            value={adminName}
            onChange={handleNameChange}
            placeholder="Admin Name"
            className="form-control text-start"
          />
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="Admin-email" className="form-label">Admin email</label>
          <input
            type="email"
            value={adminEmail}
            onChange={handleEmailChange}
            placeholder="Admin Email"
            className="form-control text-start"
          />
        </div>
        <div className="w-100 text-center">
          <button type="submit" className="btn btn-primary">Update Admin</button>
        </div>
      </form>
    </div>
  );
  
};

export default EditAdmin;

{
  /* <form onSubmit={handleSubmit} className="grid gap-4">
<input type="text" value={adminName} onChange={handleNameChange} placeholder="Admin Name" />
<input type="email" value={adminEmail} onChange={handleEmailChange} placeholder="Admin Email" />
<button type="submit">Update Admin</button>
</form> */
}

{
  /* <form>
  <div class="form-group row text-white">
    <label for="Admin-name" class="col-sm-2 col-form-label">Admin Name</label>
    <div class="col-sm-10 ">
      <input type="text" class="form-control" value={adminName} onChange={handleNameChange} placeholder="Admin Name"/>
    </div>
  </div>
  <div class="form-group row text-white">
    <label for="email" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" value={adminEmail} onChange={handleEmailChange} class="form-control" id="inputPassword3" placeholder="email"/>
    </div>
  </div>
  <div>
  <button className=" rounded-md border-0 flex justify-center items center" type="submit">Update Admin</button>
  </div>
</form> */
}
