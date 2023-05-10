// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOpenIssues, selectLoading } from 'redux/selectors';
import IssueCard from 'components/IssueCard';
import Loader from 'components/Loader';

const ToDo = ({ 
    board, 
    dragStartHandler, 
    dragEndHandler, 
    dragOverHandler, 
    dropHandler,
    dropCardHandler
 }) => {
    const issues = useSelector(selectOpenIssues);
    const isLoading = useSelector(selectLoading);

    return (
        <section 
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropCardHandler(e, board)}
            style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                minHeight: '800px'
            }}
        >
            {isLoading && <Loader />}
            {issues.length > 0 && issues.map(item => {
                return (
                    <IssueCard 
                        key={item.id} 
                        item={item} 
                        board={board}

                        dragStartHandler={dragStartHandler}
                        dragEndHandler={dragEndHandler}
                        dragOverHandler={dragOverHandler}
                        dropHandler={dropHandler}
                    />
                )
            })}
        </section>
    )
}

export default ToDo;