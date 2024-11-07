import styles from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const decrease = () => {
    dispatch(cartActions.subtraction(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["price"]}>{props.price}&nbsp;Р</div>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["minus"]} onClick={decrease}>
          <img
            className={styles["icon"]}
            src="/icon/minus.svg"
            alt="decrease icon"
          />
        </button>
        <div className={styles["number"]}>{props.count}</div>
        <button className={styles["plus"]} onClick={increase}>
          <img
            className={styles["icon"]}
            src="/icon/plus.svg"
            alt="increase icon"
          />
        </button>
        <button className={styles["remove"]} onClick={remove}>
          <img
            className={styles["icon"]}
            src="/icon/cross.svg"
            alt="remove icon"
          />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
