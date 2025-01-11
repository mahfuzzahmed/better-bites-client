import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const MainLayout = () => {
    return (
        <div className="relative">

            <div className="sticky top-0 z-50 bg-white">
                <Navbar></Navbar>
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