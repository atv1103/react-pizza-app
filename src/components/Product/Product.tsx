import { Await, useLoaderData } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { Product as IProduct } from "../../interfaces/product.interface";
import { Suspense } from "react";
import style from "./Product.module.css";
import Button from "../Button/Button";

export function Product() {
  //   const { id } = useParams();
  // const data = useLoaderData() as IProduct;
  const data = useLoaderData() as { data: IProduct };
  return (
    <>
      <Suspense fallback="Загружаю..">
        <Await resolve={data.data}>
          {/* {({ data }: { data: IProduct }) => <>Product - {data.name}</>} */}
          {({ data }: { data: IProduct }) => (
            <>
              <div className={style["header"]}>
                <div className={style["title"]}>{data.name}</div>
                <Button className={style["button"]}>
                  <img
                    className={style["icon"]}
                    src="/icon/shop.svg"
                    alt="cart icon"
                  />
                  В корзину
                </Button>
              </div>
              <div className={style["content"]}>
                <img
                  className={style["image"]}
                  src={data.image}
                  alt={data.name}
                />
                <div className={style["info"]}>
                  <div className={style["row"]}>
                    <div className={style["row-title"]}>Цена</div>
                    <div className={style["row-content"]}>{data.price}</div>
                  </div>
                  <div className={style["row"]}>
                    <div className={style["row-title"]}>Рейтинг</div>
                    <div className={style["row-content"]}>{data.rating}</div>
                  </div>
                  <div className={`${style["row"]} ${style["row-ingredients"]}`}>
                    <ul className={style["row-title"]}>Состав</ul>
                    {data.ingredients.map((ingredient, i) => (
                      <li key={i} className={style["ingredient"]}>
                        {ingredient}
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
  // return <>Product - {data.name}</>;
}
