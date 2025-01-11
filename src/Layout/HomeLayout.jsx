import AppDownloadSection from "../Components/AppDownloadSection";
import Banner from "../Components/Banner";
import EmailSignUp from "../Components/EmailSignUp";
import FeaturedFoods from "../Components/FeaturedFoods";
import HowWeDoit from "../Components/HowWeDoit";

const HomeLayout = () => {
    return (
        <div>
            <header>
                <Banner></Banner>
            </header>
            <main className="">
                <section>
                    <FeaturedFoods></FeaturedFoods>
                </section>
                <section>
                    <AppDownloadSection></AppDownloadSection>
                </section>
                <section className="container mx-auto">
                    <HowWeDoit></HowWeDoit>
                </section>
                <section>
                    <EmailSignUp></EmailSignUp>
                </section>
            </main>
        </div>
    );
};

export default HomeLayout;