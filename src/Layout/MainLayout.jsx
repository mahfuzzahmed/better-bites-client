import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const MainLayout = () => {
    return (
        <div>
        <div className="mb-4">
            <nav className="container mx-auto ">
                <Navbar></Navbar>
            </nav>
        </div>

        <main className="container mx-auto">
            <Outlet></Outlet>
        </main>

        <footer>
            <Footer></Footer>
        </footer>
    </div>
    );
};

export default MainLayout;