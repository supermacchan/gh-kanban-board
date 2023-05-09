import { useSelector } from 'react-redux';
import { selectClosedIssues } from 'redux/selectors';
import IssueCard from 'components/IssueCard';

const Done = () => {
    const issues = useSelector(selectClosedIssues);

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

export default Done;