let alert_box=document.querySelector('.alert_box');

let input_value=document.getElementById('inputvalue');

let password_input=document.getElementById('password_input');

let eye_icon=document.getElementById('eye_icon');

eye_icon.addEventListener('click',()=>{
    if (password_input.type=='text') {
        password_input.setAttribute('type','password');
         eye_icon.classList.replace('fa-eye-slash','fa-eye');
}
    
else if(password_input.type=='password'){
       password_input.setAttribute('type','text')
        eye_icon.classList.replace('fa-eye','fa-eye-slash');
   }
    
})


function alerts() {
    alert_box.style.display='none'    
}

setTimeout(alerts,5000);




