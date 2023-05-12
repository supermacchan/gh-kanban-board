export const checkQueries = (data, queries) => {
    if (queries) {
        const isIncluded = queries.find(repo => 
            repo.owner === data.owner 
            && repo.repo === data.repo
        );

        if (!isIncluded) {
            console.log('not included');
            return null;
        }

        console.log('included');
        return isIncluded;
    }
}