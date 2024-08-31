import axios from "axios"

const usePost = ()=>{
    const post = async(route : string , values : any , token? : string)=>{
        console.log(token)

        const response = await axios.post(`http://localhost:8080/${route}`,values,{
            headers : {
                Authorization : `Barear ${token}`
            }
        })

        if(response.status >=200 && response.status<300){
            console.log('here is the response data' , response.data)
            return response.data
        }else{
            throw Error('error')
        }
    }

    return post

}


export default usePost