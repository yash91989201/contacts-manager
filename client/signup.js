async function checkUserEmail(){
    const emailField=document.getElementById('email');
    const popUp1=document.getElementById('popUp1');
    const signup_btn=document.getElementById('signup_btn');
    try{

        const res=await fetch(`http://localhost:3000/searchUser/?email=${emailField.value}`);
        const userExists=await res.json();
        if(userExists){ 
            popUp1.style.display='block';
            signup_btn.style.display='none';
        }
        else {
            popUp1.style.display='none';
            signup_btn.style.display='block';
        }
    }
    catch(err){
        console.error(err);
    }
    
}


const getFormData=(formId)=>{
   
    const name=document.querySelector('#signup_form #name').value;
   
    const email=document.querySelector('#signup_form #email').value;
    const password=document.querySelector('#signup_form #password').value;
    const c_password=document.querySelector('#signup_form #c_password').value;
    if(name.length == 0 || email.length == 0 || password.length == 0 || c_password.length == 0 )return 'NO DATA';
    else if(password.length < 8) return 'password too short'
    else if(password !== c_password ) return 'PASSWORDS DO NOT MATCH'
    
    else{ 
       return {
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        pass:document.getElementById('password').value
    }
    }
};


const form = document.getElementById('signup_form')
form.addEventListener('submit',async  (event) => {
  
    event.preventDefault();
    if(getFormData('signup_form') === 'NO DATA')
        alert('All feilds are mandatory');
    
    else if(getFormData('signup_form') === 'password too short') 
        alert('Password should have more than 8 characters');
    
    else if(getFormData('signup_form') === 'PASSWORDS DO NOT MATCH') 
        alert('Passwords donot match'); 
    
    else{

            const option={
            method: 'POST',
            body: JSON.stringify(getFormData('signup_form')),
            headers: {
              'Content-Type': 'application/json'
            }
        }
        try{
            const res=await fetch('http://localhost:3000/register',option);
            const userSignup=await res.json();
            if(userSignup.success){
                alert('User Registered successfully');
                window.location.href = 'http://127.0.0.1:4000/client/login.html';
            }
        }
        catch(err){
            alert('Oops ,Something went wrong !!! Please try again');
            console.log(err);
        }

    }


    
    // if(document.getElementById('password').value === document.getElementById('c_password').value){
    //     const formData={
    //         name:document.getElementById('name').value,
    //         email:document.getElementById('email').value,
    //         pass:document.getElementById('password').value
    //     };
    //     const option={
    //         method: 'POST',
    //         body: JSON.stringify(formData),
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //     }
    //     try{
    //         const res=await fetch('http://localhost:3000/register',option);
    //         const userSignup=await res.json();
    //         if(userSignup.success){
    //             alert('User Registered successfully');
    //             window.location.href = 'http://127.0.0.1:4000/client/login.html';
    //         }
    //     }
    //     catch(err){
    //         alert('Oops ,Something went wrong !!! Please try again');
    //         console.log(err);
    //     }
    // }
    // else{
    //     const signup_btn=document.getElementById('signup_btn');
    //     const popUp1=document.getElementById('popUp1');
    //     const popUp2=document.getElementById('popUp2');
    //     signup_btn.style.display='none';
    //     popUp1.style.display='none';
    //     popUp2.style.display='block';
    //     document.getElementById('password').value='';
    //     document.getElementById('c_password').value='';
    // }
});

// form_id = signup_form
