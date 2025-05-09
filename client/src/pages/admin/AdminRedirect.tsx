// src/pages/admin/AdminRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/dashboard", {
          withCredentials: true,
        });

        if (res?.data?.admin?.isAdmin && res?.data?.admin?.accessGranted) {
          navigate("/admin/dashboard");
        } else {
          navigate("/admin/login");
        }
      } catch {
        navigate("/admin/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default AdminRedirect;
