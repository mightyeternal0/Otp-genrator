const slider = document.querySelector('#range');
const len = document.querySelector('.len-msg-num');
const upperCase = document.querySelector('.upper-check');
const lowerCase = document.querySelector('.lower-check');
const numbers = document.querySelector('.number-check');
const symbols = document.querySelector('.symbol-check');
let symbolArray = '~`!@#$%^&*()_-=+{}[]:;"\|/?.><,';
const allCheckBox = document.querySelectorAll('.all');
const generatorButton = document.querySelector('.btn-generator');
const password1 = document.querySelector('.pass');
const copyButton = document.querySelector('.btn-cpy');
const copyMessage = document.querySelector('.cpy-msg');
const colu = document.querySelector('.color');
const re = document.querySelector('.reset');
let count=0;
let password = "";
password1.value = password;// input mai value denai kai li value keword ka use kota  naa ki innertext

let passwordLength = 10;
let a = true;
let b;


// *****************************************this is the slider part of project*********************************
function handleSlider(){
    slider.value = passwordLength;  
    len.innerText = passwordLength;  // set the value of slider on text format
}
slider.addEventListener('input', (e)=>{ // evnet handler are apply on slider
    passwordLength = e.target.value;
    handleSlider(); // call the handler function
})
handleSlider();

//************************************************************************************************************** */


function randomGenerator(min ,max){
    return (Math.floor(Math.random()*(max-min))+min);
}





//************************ function for uppercase generator******************** */

function upperCaseLetter(){
    return String.fromCharCode(randomGenerator(65,90));
}
function lowerCaseLetter(){
    return String.fromCharCode(randomGenerator(97 , 122));
}
function numberRandom(){
    return randomGenerator(0,9);
}
function symbolRandom(){
   let x = randomGenerator(0 ,  symbolArray.length);
   return symbolArray.charAt(x);

   
}

//************************************************************************************ */
function handleCheck(){
    count=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            count++;
        }
    });
    if(passwordLength<count){
        passwordLength = count;
        handleSlider();
    }


}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheck);
});

//************************************Now generate button click and generate password************************************************ */
function create(){
    console.log('hello');
    if(count<=0){
        return;
    }
    if(passwordLength<count){
        passwordLength=count;
        handleSlider();
    }
    const array = [ ];
    if(upperCase.checked){
        array.push(upperCaseLetter());
    }
    if(lowerCase.checked){
        array.push(lowerCaseLetter());
    }
    if(numbers.checked){
        array.push(numberRandom());
    }
    if(symbols.checked){
        array.push(symbolRandom());
    }
   
    console.log(password);
    let z = array.length;
    console.log(passwordLength);
    

    for(let i=0;i<(passwordLength-z);i++){
        let y = randomGenerator(0, z);
        if(y===0){
            array.push(upperCaseLetter());

        }
        else if(y===1){
            array.push(lowerCaseLetter());
        }
        else if(y==2){
            array.push(numberRandom());
        }
        else if(y==3){
            array.push(symbolRandom());
        }

    }
    for(let i=0;i<array.length;i++){
        password+=array[i];
    }
    function suffle(arraySuffle){
        console.log('hello');
        for(let i=arraySuffle.length-1;i>0;i--){
            let j = Math.floor((Math.random())*(i+1));
            let temp;
            temp = arraySuffle[i];
            arraySuffle[i]=arraySuffle[j];
            arraySuffle[j]=temp;
        }
        
        let str="";
        arraySuffle.forEach((el)=>(str+=el)
        );
        return str;
    }
    password = suffle(Array.from(password));
    color(count);





    password1.value = password;
}

generatorButton.addEventListener('click', ()=>{
    
    if(!password1.value ){
    create();
  
    }

});
//*************************************************************************************** */
async function copyBut(){
    console.log('message copy');
    try{
         await navigator.clipboard.writeText(password1.value);
         copyMessage.innerText = "copied";
         console.log('done');


    }
    catch(e){
        copyMessage.innerText = "Failed "+e;
    }
    copyMessage.classList.add("active");

    setTimeout(()=>{
        copyMessage.classList.remove("active");
    },1200);
    



}


copyButton.addEventListener('click',()=>{
    console.log('nice');
    if(password1.value){
        copyBut();
    }
});

//*********************************************************************************** */
function color(count){
    if(count===1){
        colu.style.backgroundColor='red';
    }
    else if(count===2 || count===3){
        colu.style.backgroundColor='yellow';

    }
    else if(count===4){
        colu.style.backgroundColor='rgb(9, 241, 9)';
    }
}

re.addEventListener('click',()=>{
    password="";
    if(password1.value){
    create();
    }
});