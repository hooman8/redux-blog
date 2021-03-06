import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    _.chain(getState().posts).map('userId').uniq().forEach(id => dispatch(fetchUser(id))).value();
};

export const fetchPosts = () => {
    return async function (dispatch) {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({ type: 'FETCH_POSTS', payload: response.data });
    };
};

// Action creator for fetching one user at the time

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
};

// the following code belongs to the approach that memoize the fetch user function in order to prevent the same call for a repeating user

// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: response.data});
// });