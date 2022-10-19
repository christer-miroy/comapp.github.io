const userLogin = document.querySelector('#userLogin');

userLogin.addEventListener('submit', login)

function login(e) {
    e.preventDefault();

    //empty field validation
    if (document.getElementById("email").value == "")  {
        alert("Please enter email address.");
        return false;
    }

    if (document.getElementById("password").value == "") {
        alert("Please enter password.");
        return false;
    }

    //email validation
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (document.getElementById("email").value.match(mailformat)) {
        //valid email format. proceed with compare email and password
        axios.post('/login', {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }).then (response => {
            console.log(response);
            location.assign('/login-success');
        }).catch(error => {
            alert(error.response.data.error);
        }) 
        } else {
            alert("Invalid email address");
        return false;
    }    
    
}

