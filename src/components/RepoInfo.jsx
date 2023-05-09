import { Container, Breadcrumb, Icon, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { selectCurrentOwner, selectCurrentRepo } from 'redux/selectors';
  
const RepoInfo = () => {
    const owner = useSelector(selectCurrentOwner);
    const repo = useSelector(selectCurrentRepo);

    const URL_BASE = "https://github.com/";
    const sections = [
        { key: 'username', content: `${owner}`, href: `${URL_BASE}${owner}` },
        { key: 'repo-name', content: `${repo}`, href: `${URL_BASE}${owner}/${repo}` }
    ];

    return (
        <Container style={{paddingBottom: '15px'}}>
            <Breadcrumb icon='right angle' sections={sections} size='large' />
            <Label color='black' style={{marginLeft: '15px'}}>
                <Icon name="star" color="yellow" />
                100 stars
            </Label>
        </Container>
    )
}
  
  export default RepoInfo;