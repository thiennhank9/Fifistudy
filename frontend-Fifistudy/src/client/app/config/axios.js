import axios from "axios";
import {serverDomain} from "./server";

const instance = axios.create({
    baseURL: serverDomain,
});
export default instance