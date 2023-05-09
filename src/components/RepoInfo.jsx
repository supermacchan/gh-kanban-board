import { Breadcrumb, Icon, Label } from 'semantic-ui-react';
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
        <>
            <Breadcrumb icon='right angle' sections={sections} />
            <Label>
                <Icon name="star" color="yellow" />
                100 stars
            </Label>
        </>
    )
}
  
  export default RepoInfo;