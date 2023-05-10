import { Card, Icon } from 'semantic-ui-react';
import { formatDate } from 'utils/formatDate';

const IssueCard = ({ 
    item, 
    board, 
    dragStartHandler, 
    dragEndHandler, 
    dragOverHandler, 
    dropHandler 
}) => {
    const URL_BASE = "https://github.com/";

    return (
        <Card 
            key={item.id} 
            color='blue' 
            style={{padding: '5px 10px', cursor: 'grab'}}
            draggable={true}
            onDragStart={e => dragStartHandler(e, item, board)}
            onDragLeave={e => dragEndHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e, item, board)}
        >
            <Card.Header as='h5'>{item.title}</Card.Header>
            <Card.Description style={{marginBottom: '12px'}}>#{item.number} opened {formatDate(item.created_at)} </Card.Description>
            <Card.Content extra style={{display: 'flex', gap: '5px', justifyContent: 'center', fontSize: '12px'}}>
                <Card.Description as='a' href={`${URL_BASE}${item.user}`} >{item.user}</Card.Description>
                <Icon name="star" color="blue" fitted />
                <Card.Description>Comments: {item.comments}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default IssueCard;