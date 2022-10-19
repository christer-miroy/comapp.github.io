/* Delete File */
const okayDeleteFile = document.getElementById("okayDeleteFile");


window.addEventListener('load', () => {
    okayDeleteFile.addEventListener('submit', (e) => {
        e.preventDefault();
        axios.delete(`/docs-list/${userId}`).then(() => {
            location.assign('/docs-list');
        })
    });

    btnDelete = document.querySelectorAll('.delete');
    btnDelete.forEach(element => {
        element.addEventListener('click', (e) => {
            userId = e.target.id;
        })
    });
})
