import axios from "axios"

export const useCategory=(url)=>{
    return axios.get(url).then(res=>res.data);
}