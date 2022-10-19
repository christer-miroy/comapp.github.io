//chat.html
const chat = document.getElementById("chat");
chat.addEventListener('click', function() {
    window.location.href = '/chat'; //redirect to user-list.html
});
//user-list.html
const user_list = document.getElementById("user-list");
user_list.addEventListener('click', function() {
    window.location.href = '/user-list'; //redirect
});
//docs-list.html
const docs_list = document.getElementById("docs-list");
docs_list.addEventListener('click', function() {
    window.location.href = '/docs-list'; //redirect
});
//docs-list.html
const logout = document.getElementById("logout");
logout.addEventListener('click', function() {
    window.location.href = '/logout'; //redirect
});