import { Grid } from 'semantic-ui-react';
import ToDoSection from './ToDoSection';
import InProgressSection from './InProgressSection';
import DoneSection from './DoneSection';

const SectionsGrid = () => {
    return (
        <> 
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <h2>To Do</h2>
                        <ToDoSection />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <h2>In Progress</h2>
                        <InProgressSection />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <h2>Done</h2>
                        <DoneSection />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default SectionsGrid;