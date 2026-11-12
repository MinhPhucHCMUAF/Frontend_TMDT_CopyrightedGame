import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout.tsx";
import Home from "../components/home/Home.tsx";
import News from "../components/news/News.tsx";
import NewsDetail from "../components/news/NewsDetail.tsx";
import Contact from "../components/contact/Contact.tsx";

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
        element: <NewsDetail/>,
      },
      {
        path: "lien-he",
        element: <Contact />,
      },
    ],
  },
]);
