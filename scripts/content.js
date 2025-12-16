
const tmp=document.createElement("h1");
tmp.textContent="ky re gandu";
document.body.prepend(tmp);





// Title adding
const thead=document.querySelector(".datatable thead");
const tbody=document.querySelector(".datatable tbody");
const tr=thead.querySelector("tr");

const myTitle=document.createElement("th");
myTitle.textContent="Performance";

tr.appendChild(myTitle);


// Body editing
const contests=tbody.children;

[...contests].forEach(function(c){
    console.log(c.children[1].textContent);
})

console.dir(tbody);