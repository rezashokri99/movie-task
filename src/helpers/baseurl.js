import axios from "axios";

const baseurl = axios.create({
    baseURL: "https://moviesapi.ir/api/v1/"
})



const http = {
    get: baseurl.get,
    post: baseurl.post,
    put: baseurl.put,
    delete: baseurl.delete,
}

export default http;
