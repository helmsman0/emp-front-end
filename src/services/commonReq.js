import axios from 'axios';

export const commonReq = async (method,url,body,header)=>{
    let config = {
        method,
        url,
        headers:header?header:{
            "Content-Type":"application/json"
        },
        data:body
    }
    //request instant
    return axios(config).then(response=>{
        console.log(response);
        return response
    }).catch(err=>{
        console.log(err);
        return err
    })
}