import { Breadcrumb, Icon, Label } from 'semantic-ui-react';

const URL_BASE = "https://github.com/"

const sections = [
    { key: 'username', content: 'username', href: `${URL_BASE}username` },
    { key: 'repo-name', content: 'repo name', href: `${URL_BASE}username/repo` }
  ]
  
const RepoInfo = () => {
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