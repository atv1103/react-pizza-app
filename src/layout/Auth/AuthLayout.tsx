import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router-dom";
import cn from "classnames";

export function AuthLayout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src="/auth-bg.jpg" alt="auth background" />
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
