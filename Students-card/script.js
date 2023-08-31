class Student {
    id;
    firstName;  
    lastName;    
    email;
    image;
}

function getUser(id) {
    return fetch(`https://reqres.in/api/users?id=${id}`)
        .then((response) => response.json())
}

async function getUserData(id) {
    try {
        const user = await getUser(id);
        render(user);
    } catch(err) {
        console.log(`[Erro]: ${err}`)
    }  
}

function render(user) {
    
    const student = new Student;

    student.id = user.data.id;
    student.firstName = user.data.first_name;
    student.lastName = user.data.last_name;
    student.email = user.data.email;
    student.image = user.data.avatar;

    const frmContainer= window.document.querySelector(".container");
    const box1 = window.document.querySelector(".group1");
    const box2 = window.document.querySelector(".group2");
    const box3 = window.document.querySelector(".group3");
    const box4 = window.document.querySelector(".group4");
   
    const card = document.createElement('div');
    card.classList.add("card")   

    const cardData = `      

        <div class="row">
            <div class="col-2">
                <div class="logo">
                    <img src="./img/vs-code.svg" alt="logo">    
                </div>               
            </div> 

            <div class="col-2">
                <div class="perfil">
                    <img src="${student.image}" alt="perfil">
                    <p>ID: ${student.id}</p>
                </div>
            </div>
        </div>

        <div class="info">
            <p class="data">05/2022</p>
            <p class="nome">${student.firstName} ${student.lastName}</p>
            <p class="email">${student.email}</p>
        </div>        
    ` // end

    card.innerHTML = cardData;

    if(student.id <= 3) {
        box1.appendChild(card);
    } else if(student.id <= 6) {
        box2.appendChild(card)
    } else if(student.id <= 9) {
        box3.appendChild(card)
    } else {
        box4.appendChild(card)
    }
}

for(let i = 1; i <= 12; i++ ) {
    getUserData(i);
}

