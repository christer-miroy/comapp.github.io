/* Update */
const saveBtn = document.getElementById("saveBtn");

//create event listener
saveBtn.addEventListener("click", editFunction);

function editFunction(e) {
    e.preventDefault();
    //empty field validation
    if (document.getElementById("fullName").value == "") {
        alert("Please enter full name.");
        return false;
    } else if (document.getElementById("email").value == "") {
        alert("Please enter email.");
        return false;
    } else {
        //email validation
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (document.getElementById("email").value.match(mailformat)) {
            //valid email format, proceed with other validations
            axios.post('/edit-user/:id', {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            }).then (response => {
                alert(response.data.error);
                location.assign('/user-list');
            })
        } else {
            alert("Invalid email address");
            return false;
        }
    }
}