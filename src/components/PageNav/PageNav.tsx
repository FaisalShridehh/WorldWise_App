import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
import { useAuth } from "../../hooks/UseAuth/UseAuth";


/**
 * Renders the page navigation component.
 *
 * @return {JSX.Element} The rendered page navigation component.
 */
export default function PageNav(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  return (
    <>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          {/* <li>
          <NavLink to="/">Home</NavLink>
        </li> */}
          <li>
            <NavLink to="/price">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            {!isAuthenticated && !user && (
              <NavLink to="/login" className={styles.ctaLink}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
