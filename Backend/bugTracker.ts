//Simple bug tracker to log errors, caching failures, etc.
// Path: Backend\bugTracker.ts

//Function to log errors when running tests
export function logError(err: Error){
    //Write error to a log file
    console.log("Error logged: ", err);
}

//Function to  send errors to the bug tracker
export function sendErrorToBugTracker(err: Error){
    //Send error to bug tracker
    console.log("Error sent to bug tracker");
}

