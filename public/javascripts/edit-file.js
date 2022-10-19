const getEditLabel = document.getElementById("getEditLabel");

window.addEventListener('load', () => {

    btnEdit = document.querySelectorAll('.edit');
    btnEdit.forEach(element => {
        element.addEventListener('click', (e) => {
            userId = e.target.id;
        })        
    });

    getEditLabel.addEventListener('submit', (e) => {
        e.preventDefault();
        axios.put(`/docs-list/${userId}`, {
            fileLabel:getEditLabel.fileLabel.value
        }).then(() => {
            location.assign('/docs-list');
        })
    })
})