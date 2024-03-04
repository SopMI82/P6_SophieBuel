//import { ajoutListenersAvis } from "./login.js";

// Récupération des projets depuis l'api

async function getCategories() {
    const responseCategories = await fetch('http://localhost:5678/api/categories')
    const categories = await responseCategories.json();
    return categories;
}
async function getWorks() {
    const responseWorks = await fetch('http://localhost:5678/api/works')
    let works = await responseWorks.json();
    console.log(works);
    return works;
}


// Récupération des éléments du DOM
const gallery = document.querySelector('.gallery');
const btnAll = document.getElementById("0");

const main = document.querySelector('main')

const sectionPortfolio = document.getElementById('portfolio')
const adminBanner = document.querySelector('.adminBanner')
const logBtn = document.querySelector('.logBtn')

/**
 * Vérifier la présence du token dans le local storage et définir l'affichage en fonction
 * @param {string} token 
 */
function showAdminmode() {
    let token = window.localStorage.getItem("token");
    if (token !== null) {
        logBtn.insertAdjacentHTML("afterbegin", `
        <a class="logOut">logout</a>
    `)
        adminBanner.insertAdjacentHTML("afterbegin", `
        <div class="bannerContent">
        <i class="fa-regular fa-pen-to-square"></i>
		<p>Mode édition</p>
        </div>
    `)
        sectionPortfolio.insertAdjacentHTML("afterbegin", `
		<button class="edit"><i class="fa-regular fa-pen-to-square"></i>modifier</button>
    `)
    } else {
        logBtn.insertAdjacentHTML("afterbegin", `
        <a href="./assets/login.html" class="logIn">login</a>
    `)
    }
}

const BtnModify = document.querySelector('.edit')
console.log(BtnModify);

/**
 * Fonction qui importe les projets de manière dynamique
 * @param {Array} data 
 */
async function genererProjects(data) {
    data.works.forEach (work => {
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
    const filters = document.getElementById('filters')
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
 * Générer l'affichage de la gallerie dans la popup
 * @param {Array} works 
 */
function genererApercu(works) {
    const miniGallery = document.querySelector(".miniGallery");

    works.forEach(work => {
        miniGallery.insertAdjacentHTML('beforeend', `
            <figure>
                <img src="${work.imageUrl}">
                <button class="btnTrash" id="${work.id}"><i class="fa-regular fa-trash-can"></i></button>
            </figure>
        `)
    });
}

/**
 * Supprimer le token du local storage
 * @param {string} token 
 */
function eraseToken() {
    const logOut = document.querySelector('.logOut')
    console.log(logOut);
    logOut.addEventListener("click", () => {
        window.localStorage.removeItem("token")
        logBtn.innerHTML = ""
        adminBanner.innerHTML = ""
        BtnModify.remove()
        logBtn.insertAdjacentHTML("afterbegin", `
        <a href="./assets/login.html" class="logIn">login</a>
    `)
    })
}

//////////////////////////////////////                    Modal Window



function createModal(event) {
    main.insertAdjacentHTML("beforeend", `
        <div class="popup">
            <div class="popupContent">
            </div>
        </div>
        `)
}

function generatePage1(event) {
    builtP1();
    genererApercu(works);
    generatePage2();
    closeModal();
}

function generatePage2(event) {
    const newProject = document.querySelector('.newProject')
    newProject.addEventListener("click", (event) => {
        event.preventDefault();
        builtP2();
        closeModal();
        returnPrevious()
    })
}
function returnPrevious(event) {
    const previousScreen = document.querySelector('.previousScreen')
    previousScreen.addEventListener('click', () => {
        generatePage1();
    })
}

function closeModal(event) {
    const closePopup = document.querySelector('.closePopup')
    const popup = document.querySelector('.popup')
    closePopup.addEventListener("click", () => {
        popup.remove()
    })
}

function builtP2() {
    const popupContent = document.querySelector('.popupContent')
    popupContent.innerHTML = "";
    popupContent.insertAdjacentHTML("beforeend", `
        <div class="popupNav">
            <button class="btnPopup closePopup">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class=" btnPopup previousScreen">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
        </div>
        <div class="page-two">
			<h3>Ajout photo</h3>
			<form action="" class="createProject">
				<div class="selectPhoto">
					<label for="explore"><i class="fa-regular fa-image"></i></label>
					<input id="explore"  type="file" accept=".png,.jpeg,jpeg">
                    <div id="falseButton">+ Ajouter photo</div>
					<p>jpg, png : 4mo max</p>
				</div>
				<label for="title">Titre :</label>
				<input type="text" name="title" id="projectName">
				<label for="projectCategory">Catégorie :</label>
				<select name="category" id="projectCategory">
				<div class="lineDecor"></div>
				<input class="addNewProject" type="submit" value="Valider">
			</form>
		</div>
        `)
    recupPhoto()
}

function builtP1() {
    const popupContent = document.querySelector('.popupContent')
    popupContent.innerHTML = "";
    popupContent.insertAdjacentHTML("beforeend", `
        <div class="popupNav">
            <button class="btnPopup closePopup">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="page-one">
            <h3>Galerie photo</h3>
            <div class="miniGallery"></div>
            <div class="lineDecor"></div>
            <input type="submit" class="newProject" value="Ajouter une photo">
        </div>
    `)
}




//                                                       VOIR AVEC CEDRIC !!!!!!!!!!!!!!!!!!!!!
// Ne fonctionne pas, la technique ne doit pas être bonne
function recupPhoto() {
    const explore = document.getElementById('explore')
    const selectPhoto = document.querySelector('.selectPhoto')
    console.log(explore);
    console.log(selectPhoto);
    explore.addEventListener('change', () => {
        const file = EventTarget.file;
        const imageSrc = URL.createObjectURL(file);
        selectPhoto.insertAdjacentHTML('beforeend', `
            <img class="prevNewProject" src="${imageSrc}">
        `)

    })
}


// LISTE DE VARIABLES EN ATTENTE D'UTILISATION :

/*const btnTrash = document.querySelector('.btnTrash')
console.log(btnTrash);
btnTrash.addEventListener("click", (event) => {
    const idProject = event.target.id;
    fetch(`http://localhost:5678/api/works/${idProject}`)
        .then(() => {
            generatePage1()
        })
})*/
// supprimer un projet (fetch delete)

const projectName = document.getElementById('projectName')
console.log(projectName);
//input à écouter (change) pour vérifier que la zone est bien remplie

/*
const projectCategory = document.getElementById('projectCategory')
console.log(projectCategory);
projectCategory.insertAdjacentHTML ("afterend", `
    <option>${}</option>
`)
*/

//input à écouter (change) pour vérifier que la selection est bien faite

const addNewProject = document.querySelector('.addNewProject')
console.log(addNewProject);
//couleur du bouton à modifier, et rendre le bouton clicquable lorsque selectPhoto, projectCategory et projectName sont remplis
//au clic envoyer une requete post à l'api works pour créer une nouvelle entrée
// construction du Json pour l'envoi du nouveau projet
// (à placer dans l'EventListener du bouton addNewProject)

/*
const nameValue = document.getElementById('projectName').value
//donnée à envoyer à l'API works en POST sous la ref "title"

const imageSrc = document.getElementById('explore').value
//donnée à envoyer à l'API works en POST sous la ref "imageURL"


const catValue = document.getElementById('projectCategory').value
//donnée à envoyer à l'API works en POST sous la ref "categoryId"

const createProject = {
    title: nameValue,
    imageUrl: photoUrl,
    categoryId: catValue
}
console.log(createProject);
*/
getCategories()
    .then((categories) => {
        generateBtn(categories)
        return { works: null, categories }
    })
    .then((categories) => {
        return { works: getWorks(), categories }    
    })
    .then((data) => {
        console.log(data.works);
        genererProjects(data.works)
        btnAll.addEventListener("click", () => {
            gallery.innerHTML = "";
            genererProjects(data.works);
        })
        showAdminmode()
        return data
    })
    /*.then(() => {
        eraseToken();
        BtnModify.addEventListener("click", () => {
            createModal();
            generatePage1();
        })
    })*/
