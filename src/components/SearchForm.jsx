import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from 'semantic-ui-react';
import { onFormSubmit } from "redux/slices/userSlice";
import { APIoperations } from 'redux/operations';
import { extractDataFromQuery } from "utils/extractDataFromQuery";

const SearchForm = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch();

    const handleFormSubmit = e => {
        e.preventDefault();
        const data = extractDataFromQuery(query);
        dispatch(onFormSubmit(data));
        dispatch(APIoperations.fetchAllIssues(data));
        reset();
    }

    const reset = () => {
        setQuery('');
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Field>
                <input 
                    type="text"
                    placeholder='Enter repo URL' 
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value.trim())}
                    required
                />
            </Form.Field>
            <Button type='submit'>Load issues</Button>
            {/* https://prnt.sc/jcSVOVnnqV1J */}
        </Form>
    )
}

export default SearchForm;