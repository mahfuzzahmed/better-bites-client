import AppDownloadSection from "../Components/AppDownloadSection";
import Banner from "../Components/Banner";

const HomeLayout = () => {
    return (
        <div>
            <header>
                <Banner></Banner>
            </header>
            <main>
                <section>
                    <h2>featured foods</h2>
                </section>
                <section>
                    <h2>extra-1</h2>
                    <AppDownloadSection></AppDownloadSection>
                </section>
                <section>
                    <h2>extra-2</h2>
                </section>
            </main>
        </div>
    );
};

export default HomeLayout;