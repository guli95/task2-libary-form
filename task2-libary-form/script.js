const form=document.querySelector('.form')
const errorMessage= document.querySelector('.errorMessage');
const title=document.getElementById('title')
const author=document.getElementById('author')
const priority=document.getElementById('priority')
const category=document.getElementById('category')
const tbody=document.querySelector('.tbody')
const emptyMessage= document.querySelector('.emptyMessage')
const btn=document.querySelector('.btn')
const table=document.querySelector('table')


let books=JSON.parse(window.localStorage.getItem('books'))
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
    validateForm()
    if(valid){
    tbody.innerHTML=''
    addBook();
    resetForm()
    isEmpty()
    }
    else return
})
btn.addEventListener('click',()=>{
    localStorage.clear()
    location.reload()
   
})