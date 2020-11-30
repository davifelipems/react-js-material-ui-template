import { toastr } from 'react-redux-toastr'

function capitalize(str){
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function prittyName(uglyName,separator = "_",removeName = ""){
    let splitedString = uglyName.split(separator);

    let prittyName = "";
    for (let i in splitedString) {
        if(splitedString[i] !== removeName){
            prittyName+=capitalize(splitedString[i])+" ";
        }
    }
    return prittyName;
}

export const catchMessage = function(err,props){
    
    let message = "Unknown error";
    if(err.message){
        message = err.message;
    }

    if (err.response && err.response.data.message) {
        message = err.response.data.message;
    }

    if (err.response && err.response.data.msg) {
        message = err.response.data.msg;
    }

    if (err.response
    && err.response.data.errors  
    && err.response.data.errors.length > 0) {
        for (let i in err.response.data.errors) {
            let prittyField = err.response.data.errors[i].fieldName.replace("class org.springframework.validation.beanvalidation.SpringValidatorAdapter$ViolationFieldError","");
            toastr.error("Erro","filed ("+prittyField+") Message: "+err.response.data.errors[i].message);
        }
    }

    if(err.response
    && err.response.status 
    && err.response.status === 403){
        props.history.push("/access-denied");
    }
    
    toastr.error("Erro",message);

    return props.setLoading(false);
}

export const transformRolePermissionsObject = function(rawObject,removeName = ""){
    let transformedObject = [];
    for (let i in rawObject) {
        transformedObject[i] = {pritty_name:prittyName(rawObject[i].name,"_",removeName),
                                name: rawObject[i].name};
        
    }
    return transformedObject;    
}

export const areWeTestingWithJest = function() {
    return process.env.JEST_WORKER_ID !== undefined;
}