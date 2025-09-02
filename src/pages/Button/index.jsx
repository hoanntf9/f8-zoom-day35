import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./Button.module.scss";

function Button({
  children,
  primary = false,
  secondary = false,
  rounded = false,
  bordered = false,
  href,
  size = "medium",
  className = "",
  onClick,
  disabled = false,
  loading = false,
  ...passProps
}) {
  const classNames = clsx(styles.wrapper, className, styles[size], {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.rounded]: rounded,
    [styles.bordered]: bordered,
    [styles.disabled]: disabled,
    [styles.loading]: loading
  });

  const Component = href ? "a" : "button";

  // Nếu disabled hoặc loading thì bỏ onClick
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };

  return (
    <Component
      {...passProps}
      href={href}
      className={classNames}
      onClick={handleClick}
      disabled={disabled && !href}
    >
      <span className={styles.content}>{children}</span>

      {loading && <span className={styles.spinner}></span>}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;