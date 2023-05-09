import { Card } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { selectClosedIssues } from 'redux/selectors';
import { formatDate } from 'utils/formatDate';

const DoneSection = () => {
    const issues = useSelector(selectClosedIssues);

    return (
        <section>
            {issues.map(item => {
                return (
                    <Card key={item.id}>
                        <Card.Header>{item.title}</Card.Header>
                        <Card.Description>#{item.number} opened {formatDate(item.created_at)} </Card.Description>
                        <Card.Description>{item.user.login} | Comments: {item.comments}</Card.Description>
                    </Card>
                )
            })}
        </section>
    )
}

export default DoneSection;