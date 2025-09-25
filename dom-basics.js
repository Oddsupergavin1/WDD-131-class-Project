const newP =document.createElement("p");
newP.textContent = "This is a new paragraph added by JavaScript.";
document.body.appendChild(newP);
//image
const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "Random image from picsum.");
document.body.appendChild(newImage);

document.body.append(newImage);

const myList = ["One", "Two", "Three"];
const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);