import Map from "../../components/Map/Map";
import Sidebar from "../../components/Sidebar/Sidebar";
import User from "../../components/User/User";
import styles from "./AppLayout.module.css";

/**
 * Renders the main layout of the application based on user authentication status.
 *
 * @return {JSX.Element} The layout component with sidebar, map, and user components.
 */
export default function AppLayout(): JSX.Element {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
