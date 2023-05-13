import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { 
    selectCurrentOwner, 
    selectCurrentRepo, 
    selectError,
    selectOpenIssues,
    selectAssignedIssues,
    selectClosedIssues,
    selectQueries
} from 'redux/selectors';
import { APIoperations } from 'redux/operations';
import { updateBoards, updateCurrentIssues } from 'redux/slices/activeSlice';
import { updateHistory } from 'redux/slices/historySlice';
import { Container, Grid, Header } from 'semantic-ui-react';
import { checkQueries } from "utils/checkQueries";
import ToDo from './GridSections/ToDo';
import InProgress from './GridSections/InProgress';
import Done from './GridSections/Done';

const KanbanGrid = () => {
    const dispatch = useDispatch();

    const owner = useSelector(selectCurrentOwner);
    const repo = useSelector(selectCurrentRepo);
    const error = useSelector(selectError);
    const queries = useSelector(selectQueries);
    // const open = useSelector(selectOpenIssues);
    // const assigned = useSelector(selectAssignedIssues);
    // const closed = useSelector(selectClosedIssues);

    // const initialBoards = useMemo(() => [
    //     // {
    //     //     title: "open",
    //     //     issues: useSelector(selectOpenIssues)
    //     // },
    //     // {
    //     //     title: "assigned",
    //     //     issues: useSelector(selectAssignedIssues)
    //     // },
    //     // {
    //     //     title: "closed",
    //     //     issues: useSelector(selectClosedIssues)
    //     // },
    //     {
    //         title: "open",
    //         issues: open
    //     },
    //     {
    //         title: "assigned",
    //         issues: assigned
    //     },
    //     {
    //         title: "closed",
    //         issues: closed
    //     }
    // ], [open, assigned, closed]);

    const initialBoards = [
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
    ]

    // eslint-disable-next-line
    // const [initialBoards, setInitialBoards] = useState([
    //     {
    //       title: "open",
    //       issues: open,
    //     },
    //     {
    //       title: "assigned",
    //       issues: assigned,
    //     },
    //     {
    //       title: "closed",
    //       issues: closed,
    //     },
    //   ]);

    // const initialBoards = useMemo(
    //     () => [
    //              {
    //                 title: "open",
    //                  issues: open,      
    //             },      
    //             {        
    //                 title: "assigned",        
    //                 issues: assigned,      
    //             },      
    //             {        
    //                 title: "closed",        
    //                 issues: closed,      
    //             },    
    //         ],
    //     [open, assigned, closed]
    //   );

    // useEffect(() => {
    //     setInitialBoards([
    //       {
    //         title: "open",
    //         issues: open,
    //       },
    //       {
    //         title: "assigned",
    //         issues: assigned,
    //       },
    //       {
    //         title: "closed",
    //         issues: closed,
    //       },
    //     ]);
    //   }, [open, assigned, closed]);

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);  
    const [boards, setBoards] = useState(initialBoards); 

    // const resetBoards = useCallback(() => {
    //     setBoards(initialBoards);
    //   }, [initialBoards]);

    
    useEffect(() => {
        if (error) {
            return;
        }

        if (owner && repo) {
            const data = {owner, repo};
            console.log('kanban mounts');
            console.log(queries);

            if (queries.length === 0) {
                console.log('no q')
                return;
            }

            console.log('here comes the q');
            const queriesCheck = checkQueries(data, queries);
            // если запрос уже включен в историю
            if (queriesCheck) {
                console.log('updating current issues from the history');
                dispatch(updateCurrentIssues(queriesCheck));
                
                resetBoards();
                return;
            }

            dispatch(APIoperations.fetchAllIssues(data));
            // обновлять борды после каждого нового запроса - с обновлением оунера и репо
            resetBoards();
        }

        // eslint-disable-next-line
    }, [dispatch, owner, repo, error, queries])

    const resetBoards = () => {
        setBoards(initialBoards);
    }

    const dragStartHandler = (e, item, board) => {
        setCurrentBoard(board);
        setCurrentItem(item);
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

        const currentIndex = currentBoard.issues.indexOf(currentItem);
        const clearedBoard = [...currentBoard.issues];
        clearedBoard.splice(currentIndex, 1);
        
        // обновленная версия доски, с которой мы подняли карту
        const CURRENT_BOARD = {
            title: currentBoard.title,
            issues: [...clearedBoard]
        }
        setCurrentBoard(CURRENT_BOARD);

        const dropIndex = board.issues.indexOf(item);
        const updatedBoard = [...board.issues];
        updatedBoard.splice(dropIndex, 0, currentItem);

        // обновленная версия той доски, на которую мы положили новую карту
        const BOARD = {
            title: board.title,
            issues: [...updatedBoard]
        }

        const FINALLY = boards.map(b => {
            if (b.title === board.title) {
                return BOARD;
            }

            if (b.title === currentBoard.title) {
                return CURRENT_BOARD;
            }

            return b;
        });

        setBoards(FINALLY);

        // dispatch(updateBoards(FINALLY));

        // console.log("карта дропнулась - обновляю историю");
        // dispatch(updateHistory({owner, repo, FINALLY}));
    }

    const dropCardHandler = (e, board) => {
        if (e.target.className === "ui blue card") {
            return;
        }

        const updatedBoard = [...board.issues];
        updatedBoard.push(currentItem);

        // обновленная версия той доски, на которую мы положили новую карту
        const BOARD = {
            title: board.title,
            issues: [...updatedBoard]
        }

        const currentIndex = currentBoard.issues.indexOf(currentItem);
        const clearedBoard = [...currentBoard.issues];
        clearedBoard.splice(currentIndex, 1);

        // обновленная версия доски, с которой мы подняли карту
        const CURRENT_BOARD = {
            title: currentBoard.title,
            issues: [...clearedBoard]
        }
        setCurrentBoard(CURRENT_BOARD);

        const FINALLY = boards.map(b => {
            console.log(b.title);

            if (b.title === board.title) {
                return BOARD;
            }

            if (b.title === currentBoard.title) {
                return CURRENT_BOARD;
            }

            return b;
        });
        setBoards(FINALLY);

        // dispatch(updateBoards(FINALLY));

        // console.log("карта дропнулась - обновляю историю");
        // dispatch(updateHistory({owner, repo, FINALLY}));
    }

    useEffect(() => {
        console.log("boards обновились");
        console.log(boards);
        dispatch(updateBoards(boards));

        console.log("обновляю историю");
        dispatch(updateHistory({owner, repo, boards}));
    }, [dispatch, boards, owner, repo])

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