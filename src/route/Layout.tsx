import { Footer } from "../components/footer/Footer.tsx";
import { Header } from "../components/header/Header.tsx";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
