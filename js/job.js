//applicants or appl
//name , email, phone, occupation, subject, about, link, date
const appllist = document.querySelector('#appl-list');
const formleft = document.querySelector('#add-appl-form');
//create elements and renders
function renderAppl(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let phone = document.createElement('span');
    let email = document.createElement('span');
    let occupation = document.createElement('span');
    let subject = document.createElement('span');
    let about = document.createElement('span');
    let link = document.createElement('a');
    let date = document.createElement('span');
    let cross = document.createElement('div');

    //setting the unique attributes
    li.setAttribute('data-id', doc.id);
    name.textContent = "Name: "+ doc.data().name;
    phone.textContent = "Phone: " +doc.data().phone;
    email.textContent = "Email: " + doc.data().email;
    occupation.textContent = "Occupation: "+ doc.data().occupation;
    subject.textContent = "Subject: "+doc.data().subject;
    about.textContent = "About: " +doc.data().about;
    //creates the hyper link
    link.textContent = "Link: " + doc.data().link;
    link.href = doc.data().link;
    link.target = "_blank";
    date.textContent = "Date: " + doc.data().date.toDate();
    cross.textContent = "x";

    li.appendChild(date);
    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(phone);
    li.appendChild(occupation);
    li.appendChild(link);
    li.appendChild(subject);
    li.appendChild(about);
    
    
    li.appendChild(cross);


    appllist.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('applicants').doc(id).delete();
    })


}

//saving applicants
formleft.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('applicants').doc(formleft.email.value).set({
        name: formleft.name.value,
        email: formleft.email.value,
        phone: formleft.phone.value,
        occupation: formleft.occupation.value,
        subject: formleft.subject.value,
        link: formleft.link.value,
        about: formleft.about.value,
        date: new Date()
    });
    formleft.name.value = '';
    formleft.email.value = '';
    formleft.phone.value = '';
    formleft.occupation.value = '';
    formleft.subject.value = '';
    formleft.link.value = '';
    formleft.about.value = '';
})

//realtime listener
db.collection('applicants').orderBy('date').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderAppl(change.doc)
        }
        else if(change.type == 'removed'){
            let li = appllist.querySelector('[data-id='+ change.doc.id +']');
            appllist.removeChild(li);
        }
    })
})




//job opportunity
//name , email, phone, occupation, subject, about, link, date

const joblist = document.querySelector('#job-list');
const formright = document.querySelector('#add-job-form');
//create elements and renders
function renderJob(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let phone = document.createElement('span');
    let email = document.createElement('span');
    let occupation = document.createElement('span');
    let subject = document.createElement('span');
    let about = document.createElement('span');
    let link = document.createElement('a');
    let date = document.createElement('span');
    let cross = document.createElement('div');

    //setting the unique attributes
    li.setAttribute('data-id', doc.id);
    name.textContent = "Name: "+ doc.data().name;
    phone.textContent = "Phone: " +doc.data().phone;
    email.textContent = "Email: " + doc.data().email;
    occupation.textContent = "Occupation: "+ doc.data().occupation;
    subject.textContent = "Subject: "+doc.data().subject;
    about.textContent = "About: " +doc.data().about;
    //creates the hyper link
    link.textContent = "Link: " + doc.data().link;
    link.href = doc.data().link;
    link.target = "_blank";
    date.textContent = "Date: " + doc.data().date.toDate();
    cross.textContent = "x";

    li.appendChild(date);
    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(phone);
    li.appendChild(occupation);
    li.appendChild(link);
    li.appendChild(subject);
    li.appendChild(about);
    
    
    li.appendChild(cross);


    joblist.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('job').doc(id).delete();
    })


}

//saving applicants
formright.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('job').doc(formright.email.value).set({
        name: formright.name.value,
        email: formright.email.value,
        phone: formright.phone.value,
        occupation: formright.occupation.value,
        subject: formright.subject.value,
        link: formright.link.value,
        about: formright.about.value,
        date: new Date()
    });
    formright.name.value = '';
    formright.email.value = '';
    formright.phone.value = '';
    formright.occupation.value = '';
    formright.subject.value = '';
    formright.link.value = '';
    formright.about.value = '';
})

//realtime listener
db.collection('job').orderBy('date').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderJob(change.doc)
        }
        else if(change.type == 'removed'){
            let li = joblist.querySelector('[data-id='+ change.doc.id +']');
            joblist.removeChild(li);
        }
    })
})