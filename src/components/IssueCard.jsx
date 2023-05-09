import { Card, Icon } from 'semantic-ui-react';
import { formatDate } from 'utils/formatDate';

const IssueCard = ({ item }) => {
    const URL_BASE = "https://github.com/";

    return (
        <Card key={item.id} color='blue' style={{padding: '5px 10px'}}>
            <Card.Header as='h5'>{item.title}</Card.Header>
            <Card.Description style={{marginBottom: '12px'}}>#{item.number} opened {formatDate(item.created_at)} </Card.Description>
            <Card.Content extra style={{display: 'flex', gap: '5px', justifyContent: 'center'}}>
                <Card.Description as='a' href={`${URL_BASE}${item.user.login}`} >{item.user.login}</Card.Description>
                <Icon name="star" color="blue" fitted />
                <Card.Description>Comments: {item.comments}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default IssueCard;