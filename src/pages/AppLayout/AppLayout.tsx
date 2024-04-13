import { useEffect } from "react";
import Map from "../../components/Map/Map";
import Sidebar from "../../components/Sidebar/Sidebar";
import User from "../../components/User/User";
import styles from "./AppLayout.module.css";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import { useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  useEffect(() => {
    if (!user && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, user]);
  return (
    user &&
    isAuthenticated ? (
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    ) : null
  );
}
