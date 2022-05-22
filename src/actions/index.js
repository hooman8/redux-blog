import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts = () => {
    return async function(dispatch){
        const response = await jsonPlaceholder.get('/posts');
        dispatch({type: 'FETCH_POSTS', payload: response.data});            
        };   
};

// Action creator for fetching one user at the time
export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type: 'FETCH_USER', payload: response.data});
};
