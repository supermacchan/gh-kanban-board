import { Container, Breadcrumb, Icon, Label } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { APIoperations } from 'redux/operations';
import { selectCurrentOwner, selectCurrentRepo, selectCurrentStarCount, selectError } from 'redux/selectors';
import { formatNumber } from 'utils/formatNumber';
  
const RepoInfo = () => {
    const owner = useSelector(selectCurrentOwner);
    const repo = useSelector(selectCurrentRepo);
    const stargazers = useSelector(selectCurrentStarCount);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            return;
        }

        if (owner && repo) {
            dispatch(APIoperations.fetchStars({owner, repo}));
        }
    }, [dispatch, owner, repo, error])

    const URL_BASE = "https://github.com/";
    const sections = [
        { key: 'username', content: `${owner}`, href: `${URL_BASE}${owner}` },
        { key: 'repo-name', content: `${repo}`, href: `${URL_BASE}${owner}/${repo}` }
    ];

    return (
        <Container style={{paddingBottom: '15px'}}>
            { owner && 
                <Breadcrumb icon='right angle' sections={sections} size='large' />
            }
            
            { stargazers && 
                <Label color='black' style={{marginLeft: '15px'}}>
                    <Icon name="star" color="yellow" />
                    {formatNumber(stargazers)} stars
                </Label>
            }
        </Container>
    )
}
  
  export default RepoInfo;