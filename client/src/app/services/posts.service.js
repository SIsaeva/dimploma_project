import httpService from "./http.service";

const postEndpoint = "post/";

const postService = {
    createPost: async (payload) => {
        const { data } = await httpService.post(postEndpoint, payload);
        return data;
    },
    getPosts: async () => {
        const { data } = await httpService.get(postEndpoint);
        return data;
    },
    removePost: async (postId) => {
        const { data } = await httpService.delete(postEndpoint + postId);
        return data;
    }
};
export default postService;
