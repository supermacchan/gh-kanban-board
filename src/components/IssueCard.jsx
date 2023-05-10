// import { useState } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { formatDate } from 'utils/formatDate';
// import { useSelector } from 'react-redux';
// import { selectAllIsuues } from 'redux/selectors';

const IssueCard = ({ item, board, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler }) => {
    // const allIssues = useSelector(selectAllIsuues);
    // const [currentBoard, setCurrentBoard] = useState(null);
    // const [currentItem, setCurrentItem] = useState(null);
    // const [boards, setBoards] = useState(allIssues);

    const URL_BASE = "https://github.com/";

    // const dragStartHandler = (e, item, board) => {
    //     setCurrentBoard(board);
    //     setCurrentItem(item);

    //     console.log(currentBoard);
    //     console.log(currentItem);
    // }
    
    // const dragEndHandler = e => {
    //     e.target.style.transform = 'scale(1)';
    // }
    
    // const dragOverHandler = e => {
    //     e.preventDefault();

    //     if (e.target.className === "ui blue card") {
    //         e.target.style.transform = 'scale(1.02)';
    //     }
    // }
    
    // const dropHandler = (e, item, board) => {
    //     e.preventDefault();

    //     e.target.style.transform = 'scale(1)';

    //     console.log(currentBoard);
    //     console.log(currentItem);
    //     const currentIndex = currentBoard.indexOf(currentItem);
    //     console.log(currentIndex);
    //     currentBoard.splice(currentIndex, 1);

    //     console.log(board);
    //     console.log(item);
    //     const dropIndex = board.indexOf(item);
    //     console.log(dropIndex);
    //     board.splice(dropIndex, 0, currentItem);

    //     setBoards(boards.map(b => {
    //         if (b.id === board.id) {
    //             return board;
    //         }

    //         if (b.id === currentBoard.id) {
    //             return currentBoard;
    //         }

    //         return b;
    //     }))
    // }

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
            <Card.Content extra style={{display: 'flex', gap: '5px', justifyContent: 'center'}}>
                <Card.Description as='a' href={`${URL_BASE}${item.user.login}`} >{item.user.login}</Card.Description>
                <Icon name="star" color="blue" fitted />
                <Card.Description>Comments: {item.comments}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default IssueCard;