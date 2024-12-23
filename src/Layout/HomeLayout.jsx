import AppDownloadSection from "../Components/AppDownloadSection";
import Banner from "../Components/Banner";
import HowWeDoit from "../Components/HowWeDoit";

const HomeLayout = () => {
    return (
        <div>
            <header>
                <Banner></Banner>
            </header>
            <main className="">
                <section>
                    <h2>featured foods</h2>
                </section>
                <section>
                    <AppDownloadSection></AppDownloadSection>
                </section>
                <section className="container mx-auto">
                    <HowWeDoit></HowWeDoit>
                </section>
            </main>
        </div>
    );
};

export default HomeLayout;