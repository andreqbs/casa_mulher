import {api} from "@/libs/api";
import UserInput from "@/interfaces/UserInput";
import {NewUser} from "@/interfaces/NewUser";

export const newUserService = async (data: UserInput) => {
    const response = await api.post("/user/cadastrar", data);
    return response.data as NewUser;
}
