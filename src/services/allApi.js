import { BASE_URL } from "./base_url";
import { commonReq } from "./commonReq";


//register
export const empRegister = async (body,headers)=>{
    return commonReq("POST",`${BASE_URL}/employee/register`,body,headers)
}

//getalluser api
export const getuserapi = async (search)=>{
   return await commonReq("GET",`${BASE_URL}/employee/get-all-employee-details?search=${search}`,"")
}

//view profile
export const viewprofile = async (id)=>{
    return await commonReq("GET",`${BASE_URL}/employee/view-profile/${id}`,"")
 }

 //remove employee
 export const removeuser = async (id)=>{
    return await commonReq("DELETE",`${BASE_URL}/employee/delete-user/${id}`,{})
 }

 //editUser
 export const updateuser = async (id,body,headers)=>{
   return commonReq("PUT",`${BASE_URL}/employee/update/${id}`,body,headers)
 }