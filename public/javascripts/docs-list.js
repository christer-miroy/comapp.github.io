let userId;

/* Add upload */
function addUpload() {
    if ((document.getElementById("fileLabel").value == "") || (document.getElementById("chooseFileBtn").value == "")) {
        alert("Please select a file.");
        return false;
    } else {
        var formData = new FormData();
        //add three variable to form
        formData.append("fileLabel", document.getElementById("fileLabel").value);
        //formdata.append("token", "");
        formData.append("fileName", document.getElementById("chooseFileBtn").files[0]);
        axios.post('/docs-list', formData).then(() => {
            location.assign('/docs-list');
        })       
    }
}