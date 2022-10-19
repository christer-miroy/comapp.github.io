/* display file name */
//document.getElementById("spanFileLabel").textContent = fileName;

const shareForm = document.getElementById('shareForm');
const select = document.getElementById('sharedUsers')
const uploadId = document.getElementById('uploadId').value;
const deleteForm = document.getElementById('deleteForm');

let selectedUser;
let id;

window.addEventListener('load', () => {

    selectedUser = select.value
    select.addEventListener('change', e => {
        selectedUser = select.value
        console.log(selectedUser);
    })

    shareForm.addEventListener('submit', e => {
        axios.post(`/share-docs/${uploadId}`, {
            userId: selectedUser
        }).then(() => {
            location.reload()
        }).catch(error => {

        })
    })
    
    deleteForm.addEventListener('submit', (e) => {
        
        axios.put(`/share-docs/${uploadId}`, {
            userId
        }).then(() => {
            location.assign(`/share-docs/${uploadId}`);
        }) 
    })

    delete_button = document.querySelectorAll('.delete');
    delete_button.forEach(element => {
        element.addEventListener('click', (e) => {
            modal.style.display = "block";
            userId = e.target.id 
        })
    });
})