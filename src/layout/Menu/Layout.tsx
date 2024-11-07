import Button from "../../components/Button/Button";
import styles from "./Layout.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img
            className={styles["avatar"]}
            src="/avatar.svg"
            alt="user avatar"
          />
          <div className={styles["name"]}>{profile?.name}</div>
          <div className={styles["email"]}>{profile?.email}</div>
        </div>
        <div className={styles["menu"]}>
          <NavLink
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
            to="/"
          >
            <img
              className={styles["icon"]}
              src="/icon/menu.svg"
              alt="menu icon"
            />
            Меню
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(styles["link"], { [styles["active"]]: isActive })
            }
            to="/cart"
          >
            <img
              className={styles["icon"]}
              src="/icon/cart.svg"
              alt="cart icon"
            />
            Корзина
            <span className={styles["cart-count"]}>
              {items.reduce((acc, item) => (acc += item.count), 0)}
            </span>
          </NavLink>
        </div>
        <Button className={styles["exit"]} onClick={logout}>
          <img
            className={styles["icon"]}
            src="/icon/exit.svg"
            alt="exit icon"
          />
          Выход
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
