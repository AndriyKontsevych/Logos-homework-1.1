// get base elements
const form = document.forms[0];
const tableBody = document.querySelector("table").firstElementChild;
const btn = document.getElementById("btn");

// variables to save each user, to control focused element and his number(index), to validation check
const persons = [{}];
let focusElement,numberOfFocusElement;
let isValid = {
    text: false,
    password: false,
    email: false
};

// form button - create vs change tr

btn.addEventListener("click", (e)=>{
    e.preventDefault();

    function validationRset(){
        form.children[0].style.border = '';
        form.children[1].style.border = '';
        form.children[2].style.border = '';
    }
    // create new user
    if(btn.textContent === "Add user"){
        let person = {};
        let tblRow = document.createElement("tr");
        for(let i = 0; i < tableBody.firstElementChild.children.length; i++){
            let tblTd = document.createElement("td");
            
            if(i === 0){
                tblTd.textContent = persons.length;
                tblRow.appendChild(tblTd);
            }else if(i < 4){
                person[i -1] = form.children[i - 1].value;
                tblTd.textContent = `${form.children[i - 1].value}`;
                tblRow.appendChild(tblTd);
            } else if(i === 4){
                tblTd.innerHTML = `<button class="editBtn">Edit</button>`;
                tblRow.appendChild(tblTd);
            } else if(i === 5){
                tblTd.innerHTML = `<button class="deleteBtn">Delete</button>`;
                tblRow.appendChild(tblTd); 
            }
        }

        console.log(isValid);
    
        if(person[0] === '' || person[1] === '' || person[2] === ''){
            alert("Please fill in the form completely. Thank You!");
            return null;
        } else if(!isValid.text || !isValid.password || !isValid.email){
            alert("Please fill the form valid. Thank You!");
            return null;
        }else {
            persons.push(person)
            tableBody.appendChild(tblRow);  
            form.reset();
            validationRset();
            isValid.text = false;
            isValid.password = false;
            isValid.email = false;
        }
    }

    // edit user

    if(btn.textContent === "Edit user"){

        if(!isValid.text || !isValid.password || !isValid.email){
            alert("Please fill the form valid. Thank You!");
            return null;
        }else {
            persons[numberOfFocusElement][0] = form.firstElementChild.value;
            persons[numberOfFocusElement][1] = form.children[1].value;
            persons[numberOfFocusElement][2] = form.children[2].value;
            focusElement.children[1].textContent = `${persons[numberOfFocusElement][0]}`;
            focusElement.children[2].textContent = `${persons[numberOfFocusElement][1]}`;
            focusElement.children[3].textContent = `${persons[numberOfFocusElement][2]}`;
            btn.textContent = "Add user";
            form.reset();
            validationRset();
        }
    }
});

// Gets the buttons from each tr element

tableBody.addEventListener("click", function(event){
    
    if(event.target.tagName === "BUTTON"){
        focusElement =  event.target.parentElement.parentElement;
        numberOfFocusElement =  focusElement.firstElementChild.textContent;

        // Edite handler

        if(event.target.textContent === "Edit"){
            form.firstElementChild.value = `${persons[numberOfFocusElement][0]}`;
            form.children[1].value = `${persons[numberOfFocusElement][1]}`;
            form.children[2].value = `${persons[numberOfFocusElement][2]}`;
            isValid.text = true;
            isValid.password = true;
            isValid.email = true;
            // change logic to primary button
            btn.textContent = "Edit user";
        };
    
        // Delete handler
    
        if(event.target.textContent === "Delete"){
            focusElement.remove();
            for(let i = 1; i < tableBody.children.length; i++){
                tableBody.children[i].children[0].textContent = i;
            }
            persons.splice([event.target.parentElement.parentElement.firstElementChild.textContent], 1);
            form.reset();
            // set the base logic for primary button
            btn.textContent = "Add user";
        }

    } else {
        event.preventDefault();
    }

});

// validation

window.addEventListener("input", function(event){
    inputChecker(event);
});

function inputChecker(event){
    let type = {
        text: /^[A-Za-z]{4,16}$/,
        password: /^[A-Za-z0-9\_]{4,16}$/,
        email: /^[A-Za-z]{2,8}@[A-Za-z]{2,8}\.[A-Za-z]{2,3}$/
    };
    
    // event.target.value => "text"| "password" | "email" => [key] to type object
    if(type[event.target.type].test(event.target.value)){
        console.log(type[event.target.type].test(event.target.value));
        event.target.style.border = "2px green solid";
        isValid[event.target.type] = true;
    } else {
        event.target.style.border = "2px red solid";
        isValid[event.target.type ]= false;
    }  
}
