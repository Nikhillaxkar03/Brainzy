import axios from "axios";
export const fetchData = async (url: string) => {

    const token = localStorage.getItem('token');

    if(token) {
        try {
       const response = await axios.get(url, {
            headers: {
                token: token
            }
        })

        if(response.status === 200) {
            return response.data
        }
    }
    catch(e) {
        return null;
    }
    }
    else{
        return null
    }
}