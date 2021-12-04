// This is not targetinf form, but form container, which could be misleading, so I'd suggest renaming that.
const form=document.querySelector('.form')
const errorMessage= document.querySelector('.errorMessage');
// don't use getElementById;
// Also remember about spaces. VSC has plugin prettier which could help with that.
// You also don't need to use it like that. If you target your form tag with e.g. const form = form.querySelector('.form') then you can find children in form by going with const title = form.title; - it's by id or by name, can't remember now
const title=document.getElementById('title')
const author=document.getElementById('author')
const priority=document.getElementById('priority')
const category=document.getElementById('category')
const tbody=document.querySelector('.tbody')
const emptyMessage= document.querySelector('.emptyMessage')
const btn=document.querySelector('.btn')
const table=document.querySelector('table')

// Here we could introduce helper methods like const getFromStore = (itemName: string) => itemFromLocalStorage and const setInStore = (name, value) => void;
// And also - global variable :) 
let books=JSON.parse(window.localStorage.getItem('books'));

// Try to avoid having global variables in your apps, it can later on create chaos in bigger apps, because it's being saved on line 18, then changed on line 381 then again modified on line 181 and it will make your life a hell while debugging;
// You actually use validateForm method, so it can also return true or false
let valid=true

const validateForm=()=>{
    let message=[]
    if(title.value===''){message.push('Title is required')}
    if(author.value===''){message.push('Author is required')}
    if(message.length>0){
        errorMessage.innerText = message.join(', ');
        valid=false}
    else{errorMessage.innerText=''
        valid=true}
}
const addBook=()=>{
    // with that setInStore and getFrom store you won't need that global variable. You can then do const books = getFromStore('books') || [] <-- with that if there'd be no books it would default to []; 
    // and then just setInStore(books);
    if(books===null){books=[]}
    const book={
        title:title.value,
        author:author.value,
        priority:priority.value,
        category:category.value
    }
    books.push(book)
    books.map((book)=>{
        if(book.title.length>0 && book.author.length>0){
        const tr=document.createElement('tr')
        tbody.appendChild(tr)
            // Would be better to not work with strings, if you'll want to add remove method or edit you won't be able to add eventListener in here :( 
        tr.innerHTML=`<td>${book.title}</td><td>${book.author}</td><td>${book.priority}</td><td>${book.category}</td>`;}
    })
    
localStorage.setItem('books', JSON.stringify(books))
}
const resetForm=()=>{
    title.value='';
    author.value='';
    priority.value='1';
    category.value='Fiction'
}
isEmpty=()=>{
    // if !books - both null and undefined are falsy sa if (!books) will have the same effect;
if(books===null || books===undefined){
    emptyMessage.textContent=`You don't have any book in your libary. Plese add some using form from above`;
    }
else{emptyMessage.textContent=''
table.style.display='table';
}
}
isEmpty()
const IsbooksStored = ()=>{
    if(books===null){return}
    else addBook()
}
IsbooksStored()

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // here - const isValid = validateForm(); and below if (isValid) {}
    validateForm()
    if(valid){
    tbody.innerHTML=''
    addBook();
    resetForm()
    isEmpty()
    }
    // you don't need else return :) 
    else return
})
btn.addEventListener('click',()=>{
    // use that helper method - clearStore(); Having such three methods (set, get and destroy) would be more reusable in future and if you'll move from localStorage to other one you'd only have to change it in single place
    localStorage.clear()
    location.reload()
   
})

// It would be worth to considerate modularization - e.g. helper methods for localStorage could lay in other file than rest of app.
