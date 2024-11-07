import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart.tsx";
import { Error as ErrorPage } from "./pages/Error/Error.tsx";
import { Layout } from "./layout/Menu/Layout.tsx";
import { Product } from "./components/Product/Product.tsx";
import axios from "axios";
import { Product as IProduct } from "./interfaces/product.interface.ts";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Success } from "./pages/Success/Success.tsx";
// import { PREFIX } from "./helpers/API.ts";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Menu />
          </Suspense>
        ),
      },
      { path: "/success", element: <Success /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((res, rej) => {
              setTimeout(() => {
                axios
                  .get(`/API-demo/data.json`)
                  .then((data) =>
                    res({
                      data: data.data.find(
                        (e: IProduct) => e.id === +params.id!
                      ),
                    })
                  )
                  .catch((e) => rej(e));
                // axios.get(`${PREFIX}/products/${params.id}`).then(data => res(data)).catch(e => rej(e))
              }, 2000);
            }),

            // data: axios.get(`/API-demo/data.json`).then(data => ({data: data.data.find((e: IProduct) => e.id === +params.id!)}))
            // data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
          });

          const { data } = await axios.get(`/API-demo/data.json`);
          return data.find((e: IProduct) => e.id === Number(params.id));

          // const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          // return data;
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
