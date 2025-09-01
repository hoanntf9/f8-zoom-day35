import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./Buttons.module.scss";

function Buttons({
  children,
  primary = false,
  secondary = false,
  rounded = false,
  bordered = false,
  href,
  size = "medium",
  className = "",
  onClick,
  ...passProps
}) {
  const classNames = clsx(styles.wrapper, className, styles[size], {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.rounded]: rounded,
    [styles.bordered]: bordered,
  });

  const Component = href ? "a" : "button";

  return (
    <Component
      {...passProps}
      href={href}
      className={classNames}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

Buttons.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Buttons;