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

    const token = window.localStorage.getItem("token");
    const logBtn = document.querySelector('.logBtn');
    const adminBanner = document.querySelector('.adminBanner');
    const btnEdit = document.getElementById('edit');

    if (token !== null) {
        logBtn.insertAdjacentHTML("afterbegin", displayLogout());
        adminBanner.insertAdjacentHTML("afterbegin", displayAdminBanner());
        btnEdit.insertAdjacentHTML("afterbegin", displayEditModal());
        filters.style.display = "none";
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
        window.localStorage.removeItem("token");
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

