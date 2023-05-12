import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectQueries } from "redux/selectors";
import { Container, Form } from 'semantic-ui-react';
import { onFormSubmit, updateCurrentIssues } from "redux/slices/activeSlice";
import { APIoperations } from 'redux/operations';
import { extractDataFromQuery } from "utils/extractDataFromQuery";
import { checkQueries } from "utils/checkQueries";

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const error = useSelector(selectError);
    const queries = useSelector(selectQueries);
    const dispatch = useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = extractDataFromQuery(query);

        // in case the query is incorrect
        if (!data) {
            console.log('incorrect data');
            return;
        }

        // сетим данные в бредкрамс
        dispatch(onFormSubmit(data));

        // проверяем адекватность репозитория и если все ок, забираем звездочки
        dispatch(APIoperations.fetchStars(data));

        // если репо не найден, закругляемся
        if (error) {
            console.log('incorrect repo name');
            return;
        } 

        // проверяем, включен ли запрос в историю
        const queriesCheck = checkQueries(data, queries);

        // если запрос уже включен в историю
        if (queriesCheck) {
            console.log('updating');
            dispatch(updateCurrentIssues(queriesCheck));
            
            // dispatch(APIoperations.fetchStars(data));
            inputQueryReset(); 
            return;
        }

        await dispatch(APIoperations.fetchAllIssues(data));
        inputQueryReset(); 
        // dispatch(APIoperations.fetchStars(data));
        
    }

    const inputQueryReset = () => {
        setQuery('');
    }

    // const checkQueries = (data) => {
    //     if (queries) {
    //         const isIncluded = queries.find(repo => 
    //             repo.owner === data.owner 
    //             && repo.repo === data.repo
    //         );
    
    //         if (!isIncluded) {
    //             console.log('not included');
    //             return null;
    //         }
    
    //         console.log('included');
    //         return isIncluded;
    //     }
    // }

    return (
        <Container style={{padding: '15px 0'}}>
            <Form onSubmit={handleFormSubmit}>
                <Form.Field style={{display: 'flex', gap: '15px'}} >
                    <input 
                        type="text"
                        placeholder="Enter repo URL" 
                        value={query}
                        onChange={(e) => setQuery(e.currentTarget.value.trim())}
                        required
                    />
                    <Form.Button type="submit" color="black" style={{width: "150px"}} >Load issues</Form.Button>
                </Form.Field>
            </Form>
        </Container>
    )
}

export default SearchForm;