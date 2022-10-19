let modal = document.getElementById("deleteModal");
let btn = document.getElementById("deleteModal");
let userId;

const deleteOkayBtn = document.getElementById("deleteOkayBtn");

deleteOkayBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.delete(`/user-list/${userId}`).then(() => {
        location.assign('/user-list');
    })
})

delete_button = document.querySelectorAll('.delete');
delete_button.forEach(element => {
    element.addEventListener('click', (e) => {
        modal.style.display = "block";
        userId = e.target.id 
        console.log(userId);
    })
});

// When the user clicks the button, open the modal
/*
btn.onclick = function () {
    modal.style.display = "block";
}
*/
// When the user clicks on <span> (x), close the modal
/*
span.onclick = function () {
    modal.style.display = "none";
}
*/
// When the user clicks anywhere outside of the modal, close it
/*
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
*/