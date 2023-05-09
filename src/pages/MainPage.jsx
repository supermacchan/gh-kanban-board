import SearchForm from "components/SearchForm";
import RepoInfo from "components/RepoInfo";
import KanbanGrid from "components/KanbanGrid";

const MainPage = () => {
    return(
        <main>
            <SearchForm />
            <RepoInfo />
            <KanbanGrid />
        </main>
    )
}

export default MainPage;