const helplist = document.querySelector('#help-list');
const form = document.querySelector('#add-help-form');


//creates element and render list
function renderHelp(doc){
    let li = document.createElement('li');
    let date = document.createElement('span');
    let name = document.createElement('span');
    let email = document.createElement('span');
    let phone = document.createElement('span');
    let message = document.createElement('span');
    let cross = document.createElement('div');

    //if the attribute already exists, value is updated , otherwise new attribute is added
    li.setAttribute('data-id',doc.id);

    name.textContent = "Name: "+ doc.data().name;
    email.textContent = "Email: " +doc.data().email;
    phone.textContent = "Phone: "+doc.data().phone;
    message.textContent = "Message: " + doc.data().help;
    date.textContent = "Created At: "+doc.data().date.toDate();
    cross.textContent = "Resolve";

    li.appendChild(date)
    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(phone);
    li.appendChild(message);
    li.appendChild(cross);

    helplist.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('trade').doc(id).delete();
    })    
}



//saving data 
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('trade').doc(form.email.value).set({
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        help: form.help.value,
        date: new Date()
    });
    form.name.value = '';
    form.email.value= '';
    form.phone.value = '';
    form.help.value = '';
})


//realtime listener 
db.collection('trade').orderBy("date").onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    //console.log(changes);
    changes.forEach(change =>{
        //console.log(change.doc.data());
        if(change.type == 'added'){
            renderHelp(change.doc);
        }
        else if(change.type == 'removed'){
            let li = helplist.querySelector('[data-id='+ change.doc.id + ']');
            helplist.removeChild(li);
        }
    })
})