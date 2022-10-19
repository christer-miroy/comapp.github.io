let registerForm = document.querySelector("#registerForm"); //register.html

registerForm.addEventListener('submit', registerUser); //register.html event listener
function registerUser(e) {
    e.preventDefault();

    if (document.getElementById("fullName").value == "") {
        alert("Please enter full name.");
        return false;
    } else if (document.getElementById("email").value == "") {
        alert("Please enter email");
        return false;
    } else if (document.getElementById("password").value == "") {
        alert("Please enter password.");
        return false;
    } else if (document.getElementById("confirmPassword").value == "") {
        alert("Please enter password.");
        return false;
    } else if (document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        //matching password validation
        alert("Passwords does not match. Please try again.");
        return false;
    } else {
        //email validation
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (document.getElementById("email").value.match(mailformat)) {
            /* successful registration */
            axios.post('/register', {
                //get data from front end
                fullName: document.getElementById("fullName").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            }).then(response => {
                location.assign('/register-success');
            }).catch(err => {
                //show alert error
                alert(err.response.data.error)
            }) 
            return true;
        } else {
            alert("Invalid email address");
            return false;
        }
    }
}

