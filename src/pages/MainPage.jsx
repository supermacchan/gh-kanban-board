import SearchForm from "components/SearchForm";
import RepoInfo from "components/RepoInfo";
import SectionsGrid from "components/SectionsGrid";

const MainPage = () => {
    return(
        <main>
            <SearchForm />
            <RepoInfo />
            <SectionsGrid />
        </main>
    )
}

export default MainPage;