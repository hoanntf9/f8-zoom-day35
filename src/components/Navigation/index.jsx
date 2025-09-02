import { NavLink } from "react-router";
import styles from "./Navigation.module.scss";

const navItems = [
  { to: "/", title: "Home" },
  { to: "/counter", title: "Counter" },
  { to: "/todo", title: "Todo" },
  { to: "/profile", title: "Profile" },
  { to: "/Products", title: "Products" },
  { to: "/Comments", title: "Comments" },
  { to: "/Weather", title: "Weather" },
  { to: "/Buttons", title: "Buttons" },
];

function Navigation() {
  return (
    <nav className={styles.tabs}>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            isActive ? `${styles.tab} ${styles.active}` : styles.tab
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
