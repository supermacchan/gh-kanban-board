import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { 
    selectCurrentOwner, 
    selectCurrentRepo, 
    selectError,
    selectOpenIssues,
    selectAssignedIssues,
    selectClosedIssues,
} from 'redux/selectors';
import { APIoperations } from 'redux/operations';
import { updateBoards } from 'redux/slices/repoSlice';
import { Container, Grid, Header } from 'semantic-ui-react';
import ToDo from './GridSections/ToDo';
import InProgress from './GridSections/InProgress';
import Done from './GridSections/Done';

const KanbanGrid = () => {
    const dispatch = useDispatch();

    const owner = useSelector(selectCurrentOwner);
    const repo = useSelector(selectCurrentRepo);
    const error = useSelector(selectError);

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);  
    const [boards, setBoards] = useState([
        {
            title: "open",
            issues: useSelector(selectOpenIssues)
        },
        {
            title: "assigned",
            issues: useSelector(selectAssignedIssues)
        },
        {
            title: "closed",
            issues: useSelector(selectClosedIssues)
        }
    ]); 
    
    useEffect(() => {
        if (error) {
            return;
        }

        if (owner && repo) {
            dispatch(APIoperations.fetchAllIssues({owner, repo}));
        }
    }, [dispatch, owner, repo, error])


    const dragStartHandler = (e, item, board) => {
        // запоминает карту, которую мы взяли и двигаем и доску, на которой она лежит
        setCurrentBoard(board);
        setCurrentItem(item);

        // console.log(boards);
    }
    
    const dragEndHandler = e => {
        e.target.style.transform = 'scale(1)';
    }
    
    const dragOverHandler = e => {
        e.preventDefault();

        if (e.target.className === "ui blue card") {
            e.target.style.transform = 'scale(1.02)';
        }
    }
    
    const dropHandler = (e, item, board) => {
        e.preventDefault();

        e.target.style.transform = 'scale(1)';

        // берет доску, где находилась карта и изымает ее из этой доски
        const currentIndex = currentBoard.issues.indexOf(currentItem);
        // console.log(`current card index ${currentIndex}`);
        const clearedBoard = [...currentBoard.issues];
        clearedBoard.splice(currentIndex, 1);
        // console.log(clearedBoard);
        // setCurrentBoard(updatedBoard);

        // обновленная версия доски, с которой мы подняли карту
        const CURRENT_BOARD = {
            title: board.title,
            issues: [...clearedBoard]
        }

        // получает доску из пропсов целевой карточки, на которую мы скидываем новую карту
        const dropIndex = board.issues.indexOf(item);
        // console.log(`drop card index ${dropIndex}`);
        const updatedBoard = [...board.issues];
        
        updatedBoard.splice(dropIndex, 0, currentItem);
        // console.log(updatedBoard);

        // обновленная версия той доски, на которую мы положили новую карту
        const BOARD = {
            title: board.title,
            issues: [...updatedBoard]
        }

        // сетим массив всех досок и обновляем данные
        const FINALLY = boards.map(b => {
            // если тайтл доски совпадает с тайтлом той доски, на которую мы закинули новую карту
            if (b.title === board.title) {
                return BOARD;
            }

            // если тайтл доски совпадает с тайтлом доски, с которой сняли карту
            if (b.title === currentBoard.title) {
                return CURRENT_BOARD;
            }

            // в остальных случаях возвращаем доску, как есть
            return b;
        });
        console.log(FINALLY);
        setBoards(FINALLY);
        dispatch(updateBoards(FINALLY));

        // setBoards(boards.map(b => {
        //     if (b.title === board.title) {
        //         return board;
        //     }

        //     if (b.title === currentBoard.title) {
        //         return currentBoard;
        //     }

        //     return b;
        // }));
    }

    // для дропа на доску, а не на другую карту
    const dropCardHandler = (e, board) => {
        if (e.target.className === "ui blue card") {
            return;
        }

        // добавляем карточку в низ доски
        const updatedBoard = [...board.issues];
        updatedBoard.push(currentItem);

        // обновленная версия той доски, на которую мы положили новую карту
        const BOARD = {
            title: board.title,
            issues: [...updatedBoard]
        }

        // берет доску, где находилась карта и изымает ее из этой доски
        const currentIndex = currentBoard.issues.indexOf(currentItem);
        // console.log(`current card index ${currentIndex}`);
        const clearedBoard = [...currentBoard.issues];
        clearedBoard.splice(currentIndex, 1);
        // console.log(clearedBoard);
        // setCurrentBoard(updatedBoard);

        // обновленная версия доски, с которой мы подняли карту
        const CURRENT_BOARD = {
            title: board.title,
            issues: [...clearedBoard]
        }

        // сетим массив всех досок и обновляем данные
        const FINALLY = boards.map(b => {
            // если тайтл доски совпадает с тайтлом той доски, на которую мы закинули новую карту
            if (b.title === board.title) {
                return BOARD;
            }

            // если тайтл доски совпадает с тайтлом доски, с которой сняли карту
            if (b.title === currentBoard.title) {
                return CURRENT_BOARD;
            }

            // в остальных случаях возвращаем доску, как есть
            return b;
        });
        console.log(FINALLY);
        setBoards(FINALLY);
        dispatch(updateBoards(FINALLY));

        // setBoards(boards.map(b => {
        //     if (b.id === board.id) {
        //         return board;
        //     }

        //     if (b.id === currentBoard.id) {
        //         return currentBoard;
        //     }

        //     return b;
        // }))
    }

    return (
        <Container style={{padding: '15px 0'}}> 
            <Grid centered padded="horizontally">
                <Grid.Row centered>
                    <Grid.Column width={5} >
                        <Header as='h2' textAlign='center'>To Do</Header>
                        <ToDo 
                            board={boards[0]}
                            dragStartHandler={dragStartHandler}
                            dragEndHandler={dragEndHandler}
                            dragOverHandler={dragOverHandler}
                            dropHandler={dropHandler}
                            dropCardHandler={dropCardHandler}
                         />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Header as='h2' textAlign='center'>In Progress</Header>
                        <InProgress 
                            board={boards[1]} 
                            dragStartHandler={dragStartHandler}
                            dragEndHandler={dragEndHandler}
                            dragOverHandler={dragOverHandler}
                            dropHandler={dropHandler}
                            dropCardHandler={dropCardHandler}
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Header as='h2' textAlign='center'>Done</Header>
                        <Done 
                            board={boards[2]} 
                            dragStartHandler={dragStartHandler}
                            dragEndHandler={dragEndHandler}
                            dragOverHandler={dragOverHandler}
                            dropHandler={dropHandler}
                            dropCardHandler={dropCardHandler}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default KanbanGrid;