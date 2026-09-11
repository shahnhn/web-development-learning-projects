const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const isRequiredValid=checkRequired([username, email, password, confirmPassword]);
    let isFormValid=isRequiredValid;

    if(isRequiredValid){
        const isUsernameValid=checkLength(username, 3, 15);
        const isEmailValid=checkEmail(email);
        const isPasswordValid=checkLength(password, 6, 25);
        const isPasswordMatch=checkPasswordsMatch(password, confirmPassword);
        isFormValid=isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch;
    }

    if(isFormValid){
        alert("Registration Successful!");
        form.reset();
        document.querySelectorAll(".form-group").forEach((group)=>{
            group.className="form-group";
        });
    }
});

function checkLength(input, min, max){
    if(input.value.length<min){
        showError(input, `${formatFieldName(input)} must be at least ${min} characters`);
        return false;
    }
    else if(input.value.length>max){
        showError(input, `${formatFieldName(input)} must be less than ${max} characters`);
        return false;
    }
    else{
        showSuccess(input);
        return true;
    }
}

function checkEmail(input){
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(emailRegex.test(input.value.trim())){
        showSuccess(input);
        return true;
    } else{
        showError(input, "Email is invalid");
        return false;
    }
}

function checkPasswordsMatch(password, confirmPassword){
    if(password.value!==confirmPassword.value){
        showError(confirmPassword, "Passwords do not match");
        return false;
    }
    showSuccess(confirmPassword);
    return true;
}

function checkRequired(inputArray){
    let isValid=true;

    inputArray.forEach(input=>{
        if(input.value.trim()===""){
            showError(input, `${formatFieldName(input)} is required`);
            isValid=false;
        } else{
            showSuccess(input);
        }
    });
    return isValid;
}

function formatFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

function showError(input, message){
    const formGroup=input.parentElement;
    formGroup.className="form-group error";
    const small=formGroup.querySelector("small");
    small.innerText=message;
}

function showSuccess(input){
    const formGroup=input.parentElement;
    formGroup.className="form-group success";
}

