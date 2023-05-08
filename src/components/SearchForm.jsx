import { Form, Button } from 'semantic-ui-react';

const SearchForm = () => {
    return (
        <Form>
            <Form.Field>
                <input placeholder='Enter repo URL' />
            </Form.Field>
            <Button type='submit'>Load issues</Button>
        </Form>
    )
}

export default SearchForm;