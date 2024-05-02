import { createContext } from "react";
import {  useState,useEffect } from "react";
import {API_URL} from "../api/Request";
import axios from "axios"

const Mycontext=createContext();

function Provider({children}){
    const [courses,setCourses]=useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchedData = async () =>{
        try {
            const response=await axios.get(`${API_URL}`);
            setCourses(response.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false); 
        }
    }
    useEffect(()=>{
       fetchedData();
    },[])

    const sharedValuesandMethods={
        courses,
        setCourses,
        loading,
        setLoading,
        fetchedData
    }

    return (
        <Mycontext.Provider value={sharedValuesandMethods}>
            {children}
        </Mycontext.Provider>
    );
}
export { Provider, Mycontext };