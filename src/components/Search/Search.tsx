import { forwardRef } from "react";
import styles from "./Search.module.css";
import cn from "classnames";
import { SearchProps } from "./Search.props";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { className, isValid = true, ...props },
  ref
) {
  return (
    <div className={styles["input-wrapper"]}>
      <input
        {...props}
        ref={ref}
        className={cn(className, styles["input"], {
          [styles["invalid"]]: !isValid,
        })}
      />
      <img className={styles["icon"]} src="/icon/search.svg" alt="search icon" />
    </div>
  );
});

export default Search;
