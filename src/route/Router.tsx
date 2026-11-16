import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout.tsx";
import Home from "../components/home/Home.tsx";
import News from "../components/news/News.tsx";
import NewsDetail from "../components/news/NewsDetail.tsx";
import GameProducts from "../components/products/Games.tsx";
import Contact from "../components/contact/Contact.tsx";
import Guide from "../components/info/Guide.tsx";
import Faq from "../components/info/Faq.tsx";
import PolicyPage from "../components/info/PolicyPage.tsx";
import ErrorPage from "./Error.tsx";
import Promotion from "../components/promotion/Promotion.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "tin-tuc",
        element: <News />,
      },
      {
        path: "tin-tuc/:id",
        element: <NewsDetail />,
      },
      {
        path: "game",
        element: <GameProducts />,
      },
      {
        path: "lien-he",
        element: <Contact />,
      },
      {
        path: "huong-dan",
        element: <Guide />,
      },
      {
        path: "cau-hoi-thuong-gap",
        element: <Faq />,
      },
      {
        path: "chinh-sach-doi-tra",
        element: <PolicyPage key="doi-tra" policyId="doi-tra" />,
      },
      {
        path: "chinh-sach-bao-mat",
        element: <PolicyPage key="bao-mat" policyId="bao-mat" />,
      },
      {
        path: "khuyen-mai",
        element: <Promotion />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
