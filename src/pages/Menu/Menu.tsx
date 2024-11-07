import { ChangeEvent, useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
// import { PREFIX } from "../../helpers/API";
import styles from "./Menu.module.css";
import { Product } from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import MenuList from "./MenuList/MenuList";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      // const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
      // params: {name}
      //});
      const { data } = await axios.get<Product[]>(`/API-demo/data.json`);
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      console.error(e);
      setIsLoading(false);
      return;
    }
    // try {
    //   // const res = await fetch(`${PREFIX}/products`)
    //   const res = await fetch(`/API-demo/data.json`);
    //   if (!res.ok) {
    //     return;
    //   }
    //   const data = (await res.json()) as Product[];
    //   console.log(data)
    //   setProducts(data);
    // } catch (e) {
    //   console.error(e);
    //   return;
    // }
  };

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles["head"]}>
        <Headling>Меню</Headling>
        <Search
          placeholder="Введите блюдо или состав"
          onChange={updateFilter}
        />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && products.length && <MenuList products={products} />}
        {isLoading && (
          <>
            <div>Загрузка...</div>
          </>
        )}
        {!isLoading && !products.length && <>Не найдено блюд по запросу</>}
      </div>
    </>
  );
}

export default Menu;
