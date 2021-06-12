async function checkUserEmail(){
    const emailField=document.getElementById('email');
    const popUp=document.getElementById('popUp');
    const login_btn=document.getElementById('login_btn');
    try{

        const res=await fetch(`http://localhost:3000/searchUser/?email=${emailField.value}`);
        const userExists=await res.json();
        if(!userExists){ 
            popUp.style.display='block';
            login_btn.style.display='none';
           
        }
        else {
            popUp.style.display='none';
            login_btn.style.display='block';
        }
    }
    catch(err){
        console.error(err);
    }
    
}



const form = document.getElementById('login_form')
form.addEventListener('submit',async  (event) => {
  
    event.preventDefault();
    const formData={
        email:document.getElementById('email').value,
        pass:document.getElementById('password').value
    };

    if(formData.email.length == 0 || formData.pass.length == 0){
        alert('All feilds are mandatory');
    }
    else{
        try{

            const option={
                method: 'POST',
                credentials:'include',
                body: JSON.stringify(formData),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept':'application/json',
                  'Origin':'http://localhost:3000',
                  'Access-Control-Allow-Credentials':true,
                  'Access-Control-Allow-Headers':
                   'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials',
                }
            };
            const res=await fetch('http://localhost:3000/login',option);
            const userLogin=await res.json();
            if(userLogin.success){
    
                window.location.href = 'http://127.0.0.1:4000/client/home.html';
            }
            else{
                alert(userLogin.message);
            }
        }
        catch(err){console.log(err);}
    }
});



