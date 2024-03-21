const main = document.querySelector('main')
const gallery = document.querySelector('.gallery');
const filters = document.getElementById('filters');

/**
 * Afficher tous les Projets avec le bouton "tous"
 */
function showAllProjects() {
    const btnAll = document.getElementById("0");
    btnAll.addEventListener("click", () => {
        gallery.innerHTML = "";
        genererProjects(works);
    })
}
showAllProjects() // à placer ailleurs ?


function displayEditModal() {
    const btnEdit = `<button onClick="displayModal()" class="edit"><i class="fa-regular fa-pen-to-square"></i>modifier</button>`;
    return btnEdit;
}

function displayLogout() {
    const logOutBtn = `<a class="logOut">logout</a>`;
    return logOutBtn;
}

function displayLogIn() {
    const logInBtn = `<a href="./pages/login.html" class="logIn">login</a>`;
    return logInBtn;
}

function displayAdminBanner() {
    const banner = `<div class="bannerContent">
        <i class="fa-regular fa-pen-to-square"></i>
		<p>Mode édition</p>
        </div>`;
    return banner;
}

/**
 * Vérifier la présence du token dans le local storage
 * et définir l'affichage en fonction
 */
function showAdminmode() {

    const token = window.sessionStorage.getItem("token");
    const logBtn = document.querySelector('.logBtn');
    const adminBanner = document.querySelector('.adminBanner');
    const btnEdit = document.getElementById('edit');
    console.log("test4");
    console.log(token);


    if (token !== null) {
        logBtn.innerHTML = "";
        logBtn.insertAdjacentHTML("afterbegin", displayLogout());
        console.log("test5");

        adminBanner.insertAdjacentHTML("afterbegin", displayAdminBanner());
        btnEdit.insertAdjacentHTML("afterbegin", displayEditModal());
        filters.style.display = "none";
        console.log("test");
        eraseToken();

    } else {
        filters.style.display = "flex";
        adminBanner.innerHTML = "";
        btnEdit.remove();
        logBtn.innerHTML = "";
        logBtn.insertAdjacentHTML("afterbegin", displayLogIn());
    }
}

/**
 * Supprimer le token du local storage
 * @param {string} token 
 */
function eraseToken(token) {

    const logOut = document.querySelector('.logOut');
    console.log(logOut);
    logOut.addEventListener("click", () => {
        window.sessionStorage.removeItem("token");
        showAdminmode(token);
    })
}

/**
 * Fonction qui importe les projets de manière dynamique
 * @param {Array} works 
 */
async function genererProjects(works) {
    works.forEach(work => {
        gallery.insertAdjacentHTML('beforeend', `
            <figure>
                <img src="${work.imageUrl}">
                <figcaption>${work.title}</figcaption>
            </figure>
        `)
    });
}

/**
 * Fonction qui créée les boutons'categories' de manière dynamique
 * @param {Array} categories 
 */
function generateBtn(categories) {
    categories.forEach(category => {
        const btn = `<button id="${category.id}"> ${category.name}</button>`
        filters.insertAdjacentHTML('beforeend', btn)
        const btnEvent = document.getElementById(category.id)
        btnEvent.addEventListener('click', (event) => {
            const localWorks = works.filter(work => work.categoryId == event.target.id)
            gallery.innerHTML = "";
            genererProjects(localWorks);
        })
    })
}

/**
 * Vérifie que le formulaire de contact est correctement rempli et construit le message
 */
function checkContact() {
    const form = document.getElementById('formContact');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const contactName = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        console.log(contactName.value, email.value, message.value);
        if (!contactName.value) {
            contactName.style.border = "2px solid red"
        }
        else if (!email.value) {
            email.style.border = "2px solid red"
        }
        else if (!message.value) {
            message.style.border = "2px solid red"
        }
        else {
            let mailto =
                `mailto:sophie.bluel@test.tld
        ?subject=${contactName.value} aimerait vous contacter
        &body= Merci de répondre sur cette adresse :%0D%0A${email.value} %0D%0A %0D%0AContenu du message :%0D%0A${message.value}`
            location.href = mailto
            form.reset();
        }
    })
}