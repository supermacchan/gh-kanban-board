import { Card } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APIoperations } from 'redux/operations';
import { formatDate } from 'utils/formatDate';

const ToDoSection = () => {
    const dispatch = useDispatch();
    const issues = useSelector(state => state.issues.issues);

    useEffect(() => {
        const fetch = async (owner, repo) => {
            await dispatch(APIoperations.fetchAllIssues({owner, repo}));
        }

        fetch('pineappleEA', 'pineapple-src');
        
    }, [dispatch]);
    
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

export default ToDoSection;