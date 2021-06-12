window.addEventListener('load',userLogin);
var userID;
var allContacts;
var resultHTML=``;

async function  userLogin(){

    try{
        const option={
        method:'GET',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Headers':
               'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials',
               
        }
    };
    const res=await fetch('http://localhost:3000/home',option);
    const userData=await res.json();
    if(res.status == 200){
        userID=userData.data.userId;
        fetchContacts(userData.data.userId);
        clearSearchBox();
    }
    else{
        alert('Login to view this page');
        setTimeout(()=>{
            window.location.href = 'http://127.0.0.1:4000/client/intro.html';
        },1500);
    }

    }
    catch(err){
        console.log(err);
    }
}

//get all the contacts for a spcific userId
async function fetchContacts(userId){

    try{
        const option={
        method:'GET',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Headers':
               'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials',
               
        }
    };
    const res=await fetch(`http://localhost:3000/allContacts/?userId=${userId}`,option);
    const fetchAllContacts=await res.json();

    if(fetchAllContacts.success){
        allContacts=fetchAllContacts.data;
        renderContacts(allContacts);
    }
    
    
    else{
        alert(fetchAllContacts.message);
    }

    }
    catch(err){
        console.log(err);
    }

};

// display all the contacts for one user
const renderContacts=(userContacts)=>{
    
    var hasStarred=false;
    const all_contacts=document.getElementById('all_contacts');
    const starredContactsContainer=document.getElementById('starred_contacts_container');
    if(userContacts.length !== 0 ){
        for(let i=0 ; i<userContacts.length;i++){
    
            const single_contact=document.createElement('div');
            const starredContact=document.createElement('div')
            single_contact.className='single_contact_details';
            starredContact.className='starred_contact';
            if(userContacts[i].isStarred){
               starredContact.innerHTML=generateStarredContactHtml(userContacts[i]);
               starredContactsContainer.appendChild(starredContact);
               hasStarred=true;
            }
            else{
                single_contact.innerHTML=generateContactHtml(userContacts[i]);
                all_contacts.appendChild(single_contact);

            }

            
        }
        if(hasStarred == true){
           
            document.getElementById('info').style.display='none';
        }
        else{
            document.getElementById('info').style.display='flex';
        }
        
        document.getElementById('starred_contacts_box').style.display='flex';
        document.getElementById('contacts_table').style.display='flex';
    }
    else{
        document.getElementById('search_box').style.visibility='hidden';
        document.getElementById('create_contact_box').style.visibility='hidden';
        document.getElementById('no_contacts').style.display='flex';
        document.getElementById('starred_contacts_box').style.display='none';
        document.getElementById('contacts_table').style.display='none';
    }
};

const generateContactHtml=(userContacts)=>{
    if(userContacts.contactImage === "")
        return `
        <span class="image_or_letter"  style="background-color:${generateRandomRGBColor()}">${userContacts.contactName.charAt(0).toUpperCase()}</span>
                <span onclick=showContactDetails('${userContacts._id}')  class="name">${userContacts.contactName}</span>
                <span onclick=showContactDetails('${userContacts._id}')  class="number">+91 ${userContacts.contactNumber}</span>
                <span onclick=showContactDetails('${userContacts._id}')  class="emailId">${userContacts.contactEmail}</span>
                <span   class="type">${userContacts.contactType}</span>
                <span class="options">

                    <i class="far fa-star tooltip" onclick=starContact(${userContacts.userId},'${userContacts._id}',true) >
                        <span class="tooltiptext">Star Contact</span>
                     </i>

                    <i class="fas fa-pencil-alt tooltip" onClick=editContact(${userContacts.userId},'${userContacts._id}')>
                        <span class="tooltiptext">Edit Contact</span>
                    </i>
                    <i class="fas fa-trash" onclick=deleteContact(${userContacts.userId},'${userContacts._id}')></i>
                     
                </span>
        `;
    
    else
        return `
        <span class="image_or_letter"> <img src="http://localhost:3000/images/?imgName=${userContacts.contactImage}" style="border:1.5px solid ${generateRandomRGBColor()};" > </span>
                <span onclick=showContactDetails('${userContacts._id}')  class="name">${userContacts.contactName}</span>
                <span onclick=showContactDetails('${userContacts._id}')  class="number">+91 ${userContacts.contactNumber}</span>
                <span onclick=showContactDetails('${userContacts._id}')  class="emailId">${userContacts.contactEmail}</span>
                <span onclick=showContactDetails('${userContacts._id}')  class="type">${userContacts.contactType}</span>
                <span  class="options">

                    <i class="far fa-star tooltip" onclick=starContact(${userContacts.userId},'${userContacts._id}',true)>
                        <span class="tooltiptext">Star Contact</span>
                     </i>

                    <i class="fas fa-pencil-alt tooltip" onClick=editContact(${userContacts.userId},'${userContacts._id}')>
                        <span class="tooltiptext">Edit Contact</span>
                    </i>
                    <i class="fas fa-trash" onclick=deleteContact(${userContacts.userId},'${userContacts._id}')></i>
                     
                </span>
        `;
    
};

const generateStarredContactHtml=(userContacts)=>{
    return `
    <div class="starred_contact">
                <div class="details" onclick=showContactDetails('${userContacts._id}')>
                    <div class="name">${userContacts.contactName}</div>
                </div>
                <div class="options">
                    <i class="fas fa-star tooltip" onclick=starContact(${userContacts.userId},'${userContacts._id}',false)>
                        <span class="tooltiptext">Remove from<br>starred contacts</span>
                    </i>
                    <i class="fas fa-pencil-alt tooltip" onClick=editContact(${userContacts.userId},'${userContacts._id}')>
                        <span class="tooltiptext">Edit Contact</span>
                    </i>
                </div>
            </div>
    `;
};

// open/close the modal along with the overlay
const toggleModal= (display,modalId)=>{
   
    const overlay=document.getElementById('overlay');
    const createContact=document.getElementById('create_contact');
    const editContact=document.getElementById('edit_contact');
    const showIndividualContact=document.getElementById('show_individual_contact');
    if(display == true){
        overlay.style.display='block';
        switch(modalId){
            case "create_contact":
                createContact.style.display='block';
                editContact.style.display='none';
                showIndividualContact.style.display='none';
            break; 
            case  "edit_contact":
                createContact.style.display='none';
                editContact.style.display='block';
                showIndividualContact.style.display='none';
            break; 

            case "show_individual_contact":
                createContact.style.display='none';
                editContact.style.display='none';
                showIndividualContact.style.display='block';
            break; 

        }
    }
    else{
        overlay.style.display='none';
        createContact.style.display='none';
        editContact.style.display='none';
        showIndividualContact.style.display='none';
    }
};

const getFormData=(formId)=>{
    const input=document.querySelector(`#${formId} #image`);
    const contactImage=input.files[0];   
    const contactName=document.querySelector(`#${formId} #name`).value;
    const contactNumber=document.querySelector(`#${formId} #number`).value;
    const contactEmail=document.querySelector(`#${formId} #emailId`).value;
    const contactType=document.querySelector(`#${formId} #type`).value;
    if(contactName.length == 0 ||contactEmail.length == 0 ||contactType.length == 0 )return 'NO DATA';
    else if( contactNumber.toString().length !== 10) return 'NUMBER INVALID'
    else{ 
        const formData=new FormData();
        formData.append('contactName',contactName);
        formData.append('contactNumber',contactNumber);
        formData.append('contactEmail',contactEmail);
        formData.append('contactType',contactType);
        formData.append('contactImage',contactImage);
        return formData;
    }
};

const clearFormData=(formId)=>{
    document.querySelector(`#${formId} #image`).value=null;
    document.querySelector(`#${formId} #name`).value='';
    document.querySelector(`#${formId} #number`).value='';
    document.querySelector(`#${formId} #emailId`).value='';
    document.querySelector(`#${formId} #type`).value='';
};

const putContactForUpdate=(formId,id)=>{

    const singleContactData = allContacts.find(element => element._id === id);
    document.querySelector(`#${formId} input[type=file]`).value=null;
    document.querySelector(`#${formId} #name`).value=singleContactData.contactName;
    document.querySelector(`#${formId} #number`).value=singleContactData.contactNumber;
    document.querySelector(`#${formId} #emailId`).value=singleContactData.contactEmail;
    document.querySelector(`#${formId} #type`).value=singleContactData.contactType; 
};

//create a new contact
async function createNewContact(){
   
    if(getFormData('new_contact_form') === 'NO DATA'){
        alert('All feilds are mandatory');
    }
    else if(getFormData('new_contact_form') === 'NUMBER INVALID'){
        alert('Contact number should have 10 dgits');
    }
    else{
        try{
            const option={
            method:'POST',
            body:getFormData('new_contact_form'),
            credentials:'include',
            headers: {
              'Accept':'application/json',
              'Origin':'http://localhost:3000',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Headers':
                   'Origin, X-Requested-With, Accept,Access-Control-Allow-Credentials',
                   
            }
        };
        const res=await fetch(`http://localhost:3000/createContact/?userId=${userID}`,option);
        const createContact=await res.json();
        if(createContact.success){
            alert('New Contact Created');
            setTimeout(()=>{
                toggleModal(false);
                clearFormData('create_contact');
                location.reload();
            },500);
        }
        else{
            alert(createContact.message);
        }
    
        }
        catch(err){
            console.log(err);
        }
    }
};

const showContactDetails=(id)=>{
    toggleModal(true,'show_individual_contact');
    document.getElementById('search_results').innerHTML='';
    document.getElementById('search_results').style.display='none';
    const singleContactData = allContacts.find(element => element._id === id);
    if(singleContactData.contactImage == "")
    document.getElementById('show_individual_contact').innerHTML=`
    <div class="contact_details_one">
            <div class="details">
                <img src="./user.svg" alt="">
            <span class="contact_name">${singleContactData.contactName}</span>
            </div>
            <div class="options">
                <i class="fas fa-times" onclick="toggleModal(false,'show_individual_contact')"></i>
            </div>
        </div>

        <div class="contact_details_two">
            <div class="text">Contact Details</div>
            <div class="details">
               <div class="contact_number"><i class="fas fa-phone-alt"></i>+91 ${singleContactData.contactNumber}</div>
               <div class="contact_email"><i class="far fa-envelope"></i>${singleContactData.contactEmail}</div>
               <div class="contact_type"><i class="fas fa-users"></i>${singleContactData.contactType}</div>
            </div>
        </div>
    `;
    else
    document.getElementById('show_individual_contact').innerHTML=`
    <div class="contact_details_one">
            <div class="details">
                <img src="http://localhost:3000/images/?imgName=${singleContactData.contactImage}" alt="">
            <span class="contact_name">${singleContactData.contactName}</span>
            </div>
            <div class="options">
                <i class="fas fa-times" onclick="toggleModal(false,'show_individual_contact')"></i>
            </div>
        </div>

        <div class="contact_details_two">
            <div class="text">Contact Details</div>
            <div class="details">
               <div class="contact_number"><i class="fas fa-phone-alt"></i>+91 ${singleContactData.contactNumber}</div>
               <div class="contact_email"><i class="far fa-envelope"></i>${singleContactData.contactEmail}</div>
               <div class="contact_type"><i class="fas fa-users"></i>${singleContactData.contactType}</div>
            </div>
        </div>
    `;
};

// update an existing contact
async function  editContact(userId,id){
        toggleModal(true,"edit_contact");
        putContactForUpdate('edit_contact',id);
        document.querySelector('.footer #update_btn').addEventListener('click',async function (){

          try{
            const option={
            method:'PATCH',
            body:getFormData('edit_contact'),
            credentials:'include',
            headers: {
            'Accept':'application/json',
            'Origin':'http://localhost:3000',
            'Access-Control-Allow-Credentials':true,
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Accept,Access-Control-Allow-Credentials',
                
            }
        };
        const res=await fetch(`http://localhost:3000/updateContact/?userId=${userId}&id=${id}`,option);
        const updateContact=await res.json();
        if(updateContact.success){
            alert('Contact Updated');
            setTimeout(()=>{
               toggleModal(false);
               clearFormData('edit_contact');
                location.reload();
            },500);
        }
        else console.log(updateContact);
        
        }

        catch(err){
            console.log(err);
        }
    });
};

async function starContact(userId,id,isStarred){

    try{
        const option={
        method:'GET',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Headers':
               'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials',
               
        }
    };
    const res=await fetch(`http://localhost:3000/starContact/?userId=${userId}&id=${id}&isStarred=${isStarred}`,option);
    const starContact=await res.json();

    if(starContact.success){
        location.reload();
    }
    
    
    else{
        alert(starContact.message);
    }

    }
    catch(err){
        console.log(err);
    }

}

//delete a contact
async function deleteContact(userId,id){
   
    try{
        const option={
        method:'DELETE',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Headers':
               'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials',
               
        }
    };
    const res=await fetch(`http://localhost:3000/deleteContact/?userId=${userId}&id=${id}`,option);
    const contactDelete=await res.json();
    
    if(contactDelete.success)
    location.reload();
    
    else
    alert(contactDelete.message);
    
    }
    catch(err){
        console.log(err);
    }


};

const searchContactNumber=()=>{
    const searchQuery=document.getElementById('search_query').value;

    if(Number.isInteger(+searchQuery) && searchQuery.toString().length == 10) {
        const result=allContacts.find(currentElement=>{
            return currentElement.contactNumber == parseInt(searchQuery)
        });
        displaySearchResult(result);
    }
    else if(searchQuery.length == 0) {
        document.getElementById('search_results').innerHTML='';
        document.getElementById('search_results').style.display='none';
    }
    else{
        allContacts.forEach((currentElement)=>{
           
            searchContact(currentElement,searchQuery)
        });
    }
   




};

const searchContact=(currentElement,searchQuery)=>{
    
    if(currentElement.contactName.startsWith(searchQuery)){
        displaySearchResult(currentElement,true,false);
    }
    else if (currentElement.contactEmail.startsWith(searchQuery)){
        displaySearchResult(currentElement,false,true);
    }
    else resultHTML=``;

   

    
};

const displaySearchResult=(result,name,email)=>{

     //resultHTML;
    if(name==true)
         resultHTML+=`
        <div class="result" onclick=showContactDetails('${result._id}') id="result" >
        <span class="img_or_letter">
        <div style="background-color:${generateRandomRGBColor()};" >${result.contactName.charAt(0).toUpperCase()}</div>
        </span>
        <span class="contact_name">${result.contactName} || ${result.contactNumber}</span>
        </div>
        `;
    if(email == true)
         resultHTML+=`
        <div class="result" onclick=showContactDetails('${result._id}') id="result" >
        <span class="img_or_letter">
        <div style="background-color:${generateRandomRGBColor()};" >${result.contactName.charAt(0).toUpperCase()}</div>
        </span>
        <span class="contact_name">${result.contactName} || ${result.contactEmail}</span>
        </div>
        `;
   document.getElementById('search_results').innerHTML=resultHTML;
   document.getElementById('search_results').style.display='block';

//resultHTML=``;
};

const clearSearchBox=()=>{
document.getElementById('search_query').value='';
document.getElementById('search_results').value='';
document.getElementById('search_results').innerHTML='';
document.getElementById('search_results').style.display='none';
};

async function userLogout(){

    const wantToLogout=confirm('Do you want to log out ?');
    if(wantToLogout){
       
        try{
            const option={
            method:'GET',
            credentials:'include',
            headers: {
              'Content-Type': 'application/json',
              'Accept':'application/json',
              'Origin':'http://localhost:3000',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Headers':
                   'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials',
                   
            }
        };
        const res=await fetch('http://localhost:3000/logout',option);
        const userLogout=await res.json();
        if(userLogout.success){
            
            window.location.href = 'http://127.0.0.1:4000/client/intro.html';
        }
        else{
            alert(userLogout.message);
        }
    
        }
        catch(err){
            console.log(err);
        }
    }
};

const generateRandomRGBColor=()=>{
    const red = Math.floor(Math.random() * 256/2);
    const green = Math.floor(Math.random() * 256/2);
    const blue = Math.floor(Math.random() * 256/2);
    const color=`rgb(${red},${green},${blue})`;
    return color;
}