import { useSelector } from 'react-redux';
import { selectAssignedIssues } from 'redux/selectors';
import IssueCard from 'components/IssueCard';

const InProgress = () => {
    const issues = useSelector(selectAssignedIssues);
    return (
        <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {issues.map(item => {
                return (
                    <IssueCard key={item.id} item={item} />
                )
            })}
        </section>
    )
}

export default InProgress;