import { throwError } from "rxjs";

export function handleApiError(err: any){
    console.error('API Error:', err)
    let message=''
    const backendMsg = err.error?.message || err.error?.error || err.error?.msg;
    //errors
    if (backendMsg){
        message = backendMsg;
    }
//network
    else if (err.status === 0){
        message = 'Unable to connect. Please check your internet connection';
        
    }
    //timeout
    else if (err.status === 504){
        message = 'Request timed out please try again later.';
    }
    //server
    else if (err.status === 500){
        message = 'Server error. Please try again later.';
    } 
    else {
        message= 'Unexpected error try again later';
    }

    return throwError(() => new Error(message));
}