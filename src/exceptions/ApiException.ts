import {mapApiError} from "@/utils/errorMapper";
import {ApiMessageData} from "@/interfaces/ApiMessageData";

export class ApiException extends Error {
    status?: number;
    code?: string;
    success?: boolean;

    constructor(apiError: ApiMessageData, status?: number) {
        super(mapApiError(apiError));
        this.status = status;
        this.code = apiError.error;
        this.success = apiError.success;
    }
}
