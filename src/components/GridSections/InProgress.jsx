import { useSelector } from 'react-redux';
import { selectAssignedIssues, selectLoading } from 'redux/selectors';
import IssueCard from 'components/IssueCard';
import Loader from 'components/Loader';

const InProgress = () => {
    const issues = useSelector(selectAssignedIssues);
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

export default InProgress;