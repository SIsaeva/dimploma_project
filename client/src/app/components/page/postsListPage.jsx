import {React, useEffect} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, getPostsLoadingStatus, loadPostsList} from "../../store/posts";

const PostsListPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadPostsList());
    }, []);
    const isLoading = useSelector(getPostsLoadingStatus());
    const posts = useSelector(getPosts());
    return (
        <>
            <h1>Список постов</h1>
            {!isLoading ? (
                posts.map(post => {
                    return (
                        <>
                            <div>{post.title}</div>
                            <div>{post.content}</div>
                            <hr />
                        </>
                    )
                })
            ) : (
                "loading..."
            )}
        </>
    );
}

PostsListPage.propTypes = {
    users: PropTypes.array
};

export default PostsListPage;