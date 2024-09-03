import axios from "axios"

const useCrud = ()=>{
    const post = async(route : string , values : any , token? : string)=>{

        const response = await axios.post(`http://localhost:8080/${route}`,values,{
            headers : {
                Authorization : `Barear ${token}`
            }
        })

        if(response.status >=200 && response.status<300){
            return response.data
        }else{
            throw Error('error')
        }
    }


    const get = async (route : string , values? : any , token? : string)=>{
        

        let nameP = '';

        if (values) {
            nameP = values.nameP;
        }

        const response = await axios.get(`http://localhost:8080/${route}?nameP=${nameP}`,{
            headers : {
                Authorization : `Barear ${token}`
            }
        })

        if(response.status >=200 && response.status<300){
            return response.data
        }else{
            throw Error('error')
        }
    }

    return {post , get}

}


export default useCrud