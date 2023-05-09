import { useSelector } from 'react-redux';
import { selectOpenIssues, selectLoading } from 'redux/selectors';
import IssueCard from 'components/IssueCard';
import Loader from 'components/Loader';

const ToDo = () => {
    const issues = useSelector(selectOpenIssues);
    const isLoading = useSelector(selectLoading);
    
    return (
        <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {isLoading && <Loader />}
            {issues.length > 0 && issues.map(item => {
                return (
                    <IssueCard key={item.id} item={item} />
                )
            })}
        </section>
    )
}

export default ToDo;