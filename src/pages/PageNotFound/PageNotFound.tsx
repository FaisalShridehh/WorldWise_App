import { NavLink } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div
      className={`page-not-found-container ${styles["page-not-found-container"]}`}
    >
      <div className={`${styles["page-not-found-wrapper"]}`}>
        <h1 className={`${styles.h1}`}>Oops! Page not found.</h1>
        <p className={`${styles.p}`}>
          The page you were looking for could not be located. It may have been
          moved or deleted.
        </p>
        <NavLink to="/" className={`${styles.a}`}>
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
}
