import { HeadlingProps } from "./Headling.props";
import cn from "classnames";
import styles from "./Headling.module.css";

function Headling({ children, className, ...props }: HeadlingProps) {
  return (
    <h1 {...props} className={cn(className, styles["h1"])}>
      {children}
    </h1>
  );
}

export default Headling;
