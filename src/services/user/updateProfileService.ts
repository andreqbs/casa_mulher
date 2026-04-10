 import {api} from "@/libs/api";
import {ApiMessageData} from "@/interfaces/ApiMessageData";
import {ProfileInput2} from "@/interfaces/ProfileInput2";

 export async function updateProfileService(user: ProfileInput2) {

     const response = await api.patch<ApiMessageData>(
         `${process.env.EXPO_PUBLIC_API_URL}/user/editar-perfil`,
         user,
     );
     return {...response.data};
 }