import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectCurrentOwner, selectCurrentRepo } from 'redux/selectors';
import { APIoperations } from 'redux/operations';
import { Container, Grid, Header } from 'semantic-ui-react';
import ToDo from './GridSections/ToDo';
import InProgress from './GridSections/InProgress';
import Done from './GridSections/Done';

const KanbanGrid = () => {
    const dispatch = useDispatch();
    const owner = useSelector(selectCurrentOwner);
    const repo = useSelector(selectCurrentRepo);

    useEffect(() => {
        dispatch(APIoperations.fetchAllIssues({owner, repo}));
    }, [dispatch, owner, repo])

    return (
        <Container style={{padding: '15px 0'}}> 
            <Grid centered padded="horizontally">
                <Grid.Row centered>
                    <Grid.Column width={5} >
                        <Header as='h2' textAlign='center'>To Do</Header>
                        <ToDo />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Header as='h2' textAlign='center'>In Progress</Header>
                        <InProgress />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Header as='h2' textAlign='center'>Done</Header>
                        <Done />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default KanbanGrid;