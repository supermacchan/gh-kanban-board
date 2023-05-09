import { useSelector } from 'react-redux';
import { selectOpenIssues } from 'redux/selectors';
import IssueCard from 'components/IssueCard';

const ToDo = () => {
    const issues = useSelector(selectOpenIssues);
    
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

export default ToDo;