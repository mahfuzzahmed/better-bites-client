import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const MainLayout = () => {
    return (
        <div>
        <div className=" ">
            <nav className="shadow-lg ">
                <Navbar></Navbar>
            </nav>
        </div>

        <main className="min-h-screen">
            <Outlet></Outlet>
        </main>

        <footer className="">
            <Footer></Footer>
        </footer>
    </div>
    );
};

export default MainLayout;