import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectError } from "redux/selectors";
import { Container, Form } from 'semantic-ui-react';
import { onFormSubmit } from "redux/slices/userSlice";
import { APIoperations } from 'redux/operations';
import { extractDataFromQuery } from "utils/extractDataFromQuery";

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = extractDataFromQuery(query);

        // in case the query is incorrect
        if (!data) {
            return;
        }

        dispatch(onFormSubmit(data));
        await dispatch(APIoperations.fetchAllIssues(data));

        if (error) {
            return;
        }  

        dispatch(APIoperations.fetchStars(data));
        reset(); 
    }

    const reset = () => {
        setQuery('');
    }

    return (
        <Container style={{padding: '15px 0'}}>
            <Form onSubmit={handleFormSubmit}>
                <Form.Field style={{display: 'flex', gap: '15px'}} >
                    <input 
                        type="text"
                        placeholder='Enter repo URL' 
                        value={query}
                        onChange={(e) => setQuery(e.currentTarget.value.trim())}
                        required
                    />
                    <Form.Button type='submit' color="black" style={{width: '150px'}} >Load issues</Form.Button>
                </Form.Field>
            </Form>
        </Container>
    )
}

export default SearchForm;