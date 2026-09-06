const passswordInput=document.getElementById("password");
const lengthSlider=document.getElementById("length");
const lengthDisplay=document.getElementById("length-value");
const uppercaseCheckbox=document.getElementById("uppercase");
const lowercaseCheckbox=document.getElementById("lowercase");
const numbersCheckbox=document.getElementById("numbers");
const symbolsCheckbox=document.getElementById("symbols");
const generateButton=document.getElementById("generate-btn");
const copyButton=document.getElementById("copy-btn");
const strengthBar=document.querySelector(".strength-bar");
const strengthLabel=document.getElementById("strength-label");

const uppercaseLetters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters="abcdefghijklmnopqrstuvwxyz";
const numberCharacters="0123456789";
const symbolCharacters="!@#$%^&*()-_=+[]|;:<>?";

lengthSlider.addEventListener("input", ()=>{
    lengthDisplay.textContent=lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

function makePassword(){
    const length = Number(lengthSlider.value);
    const includeUppercase=uppercaseCheckbox.checked
    const includeLowercase=lowercaseCheckbox.checked
    const includeNumbers=numbersCheckbox.checked
    const includeSymbols=symbolsCheckbox.checked

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
        alert("Please select at least one character type");
        return;
    }    

    const newPassword=createRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    passswordInput.value=newPassword;
    updateStrengthMeter(newPassword);
}

function createRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols){
    let allCharacters="";
    if(includeUppercase){
        allCharacters+=uppercaseLetters;
    }
    if(includeLowercase){
        allCharacters+=lowercaseLetters;
    }
    if(includeNumbers){
        allCharacters+=numberCharacters;
    }
    if(includeSymbols){
        allCharacters+=symbolCharacters;
    }

    let password="";

    for(let i=0;i<length;i++){
        const randomIndex=Math.floor(Math.random()*allCharacters.length);
        password+=allCharacters[randomIndex];
    }

    return password;
}

function updateStrengthMeter(newPassword){
    const passowrdLength=newPassword.length;
    const hasUppercase=/[A-Z]/.test(newPassword);
    const hasLowercase=/[a-z]/.test(newPassword);
    const hasNumber=/[0-9]/.test(newPassword);
    const hasSymbols=/[!@#$%^&*()-_=+[\]|;:<>?]/.test(newPassword);

    let strengthScore=0;
    strengthScore+=Math.min(passowrdLength*2, 40);
    if(hasUppercase){
        strengthScore+=15;
    }
    if(hasLowercase){
        strengthScore+=15;
    }
    if(hasNumber){
        strengthScore+=15;
    }
    if(hasSymbols){
        strengthScore+=15;
    }

    if(passowrdLength<8){
        strengthScore=Math.min(strengthScore, 40);
    }    

    const safeScore=Math.max(5, Math.min(100, strengthScore));
    strengthBar.style.width=safeScore+"%";

    let strengthLabelText="";
    let barColour="";

    if(strengthScore<40){
        barColour="#fc8181";
        strengthLabelText="Weak";
    }
    else if(strengthScore<70){
        barColour="#fbd38d";
        strengthLabelText="Medium";
    }
    else{
        barColour="#68d391";
        strengthLabelText="Strong";
    }

    strengthBar.style.backgroundColor=barColour;
    strengthLabel.textContent=strengthLabelText;
}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", ()=>{
    if(!passswordInput.value){
        return;
    }
    navigator.clipboard.writeText(passswordInput.value)
    .then(()=>showCopySuccess())
    .catch((error)=>console.log("Could not copy:", error));
});

function showCopySuccess(){
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color="#48bb78";
}
