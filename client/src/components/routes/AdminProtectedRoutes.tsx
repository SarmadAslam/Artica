import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import a creative loader from react-spinners

const AdminProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null means undecided, true/false for authorized
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/dashboard", {
          withCredentials: true,
        });

        // Check for admin and access granted
        if (!res?.data?.admin?.isAdmin || !res?.data?.admin?.accessGranted) {
          setIsAuthorized(false);
          navigate("/admin/login");
        } else {
          setIsAuthorized(true);
        }
      } catch {
        setIsAuthorized(false);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [navigate]);

  // Loader component using react-spinners for styling a creative loader
  const Loader = () => (
    <div className="flex justify-center items-center h-screen bg-white bg-opacity-60 backdrop-blur-sm">
      <ClipLoader color="#4B9CD3" size={50} />
    </div>
  );

  // If still loading or undecided, display loader
  if (loading || isAuthorized === null) return <Loader />;

  // If not authorized, don't render the children
  if (!isAuthorized) return null;

  return <>{children}</>;
};

export default AdminProtectedRoutes;
