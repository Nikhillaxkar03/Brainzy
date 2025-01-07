import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

function useContent(serverUrl: string) {
    const [content, setContent] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=> {
        const controller = new AbortController();

        async function fetchData() {
            try {
                const response = await axios.get(serverUrl, {
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    signal: controller.signal
                })
                if (response.status === 200) {
                    const data = response.data;
                    setContent(data);
                    setError(null);
                }
            } catch (e) {
                if(axios.isCancel(e)) {
                    console.log("fetch cancelled")
                }
                else{
                    const error = e as AxiosError;
                    //@ts-ignore
                    setError(error.response?.data?.message || "Something went wrong")
                }
            } finally {
                setIsLoading(false);
            }
        }
        
      
            fetchData();

        return () => {
            controller.abort();
        }

    }, [serverUrl]);

    return {content, error, isLoading};
   
}



export default useContent;