    
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".deleteButton");
const closeButton = document.querySelector(".cancelButton");
const mainDeleteButton = document.querySelector(".mainDeleteButton");
showButton.addEventListener("click", () => {
    console.log("delete Clicked")
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

mainDeleteButton.addEventListener("click", () => {
    console.log("clicked...delete");
});