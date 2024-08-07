import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../../components/PageNav/PageNav";
import { useAuth } from "../../hooks/UseAuth/UseAuth";

/**
 * Renders the homepage component.
 *
 * @return {JSX.Element} The rendered homepage component.
 */
export default function Homepage(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={user && isAuthenticated ? "/app" : "/login"} className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}
