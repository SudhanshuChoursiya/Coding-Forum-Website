let alert_box=document.querySelector('.alert_box');

let input_value=document.getElementById('inputvalue');


function alerts() {
    alert_box.style.display='none'    
}

setTimeout(alerts,5000);


function deletepopup() {

   if (confirm("are you sure you want to delete")==false) {
       
       input_value.setAttribute('value','');
   }
    
}
