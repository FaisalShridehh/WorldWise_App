import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth/UseAuth";
import styles from "./ProtectedRoute.module.css";



/**
 * Renders the protected route based on user authentication.
 *
 * @param {React.ReactNode} children - The children components to render.
 * @return {React.ReactNode} The rendered children if user is authenticated, otherwise a ProtectedMessage component.
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }): React.ReactNode {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, user]);

  return user && isAuthenticated ? children : <ProtectedMessage />;
}



function ProtectedMessage(): JSX.Element {
  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>Please log in to access the app.</p>
      <Link to="/login" className={styles.link}>
        Login
      </Link>
    </div>
  );
}
