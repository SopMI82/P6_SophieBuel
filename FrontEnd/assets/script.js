//import { ajoutListenersAvis } from "./login.js";

// Récupération des projets depuis l'api
const responseCategories = await fetch('http://localhost:5678/api/categories')
const categories = await responseCategories.json();

const responseWorks = await fetch('http://localhost:5678/api/works')
const works = await responseWorks.json();

// Récupération des éléments du DOM
const gallery = document.querySelector('.gallery');
const btnAll = document.getElementById("0");

const main = document.querySelector('main')

const token = window.localStorage.getItem("token");

/**
 * Vérifier la présence du token dans le local storage et définir l'affichage en fonction
 * @param {string} token 
 */
function showAdminmode(token) {
    const sectionPortfolio = document.getElementById('portfolio')
    const adminBanner = document.querySelector('.adminBanner')
    const logBtn = document.querySelector('.logBtn')

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
showAdminmode(token)

const BtnModify = document.querySelector('.edit')
console.log(BtnModify);

/**
 * Fonction qui importe les projets de manière dynamique
 * @param {Array} works 
 */
function genererProjects(works) {
    works.forEach(work => {
        gallery.insertAdjacentHTML('beforeend', `
            <figure>
                <img src="${work.imageUrl}">
                <figcaption>${work.title}</figcaption>
            </figure>
        `)
    });
}
genererProjects(works);

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
generateBtn(categories)

/**
 * Bouton qui gère l'affichage de tous les projets
 */
btnAll.addEventListener("click", () => {
    gallery.innerHTML = "";
    genererProjects(works);
})

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
                <button class="btnTrash"><i class="fa-regular fa-trash-can"></i></button>
            </figure>
        `)
    });
}


//////////////////////////////////////                    ADMIN MODE


function createModal(event) {
    main.insertAdjacentHTML("beforeend", `
        <div class="popup">
            <div class="popupContent">
            </div>
        </div>
        `)
}



function generatePage1(event) {
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
    genererApercu(works);
        }

function generatePage2(event) {
    const newProject = document.querySelector('.newProject')
    newProject.addEventListener("click", (event) => {
        event.preventDefault();
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
			<form action="" class="submissionPhoto">
				<div class="selectPhoto">
					<div class="getImg">
						<label for="explore"><i class="fa-regular fa-image"></i></label>
						<input id="explore"  type="file" accept=".png,.jpeg,jpeg">
					</div>
					<input id="addPhoto" type="submit" value="+ Ajouter photo">
					<p>jpg, png : 4mo max</p>
				</div>
				<label for="title">Titre</label>
				<input type="text" name="title" id="projectName">
				<label for="category">Catégorie</label>
				<input type="text" name="category" id="projectCategory">
			                                                                        	<!--Attention, choisir la cat pour les listes déroulantes-->
				<div class="lineDecor"></div>
				<input class="addNewProject" type="submit" value="Valider">
			</form>
		</div>
        `)
    })
}

function closeModal(event) {
    const closePopup = document.querySelector('.closePopup')
    const popup = document.querySelector('.popup')
    console.log(closePopup);
    closePopup.forEach(closePopup => {
        closePopup.addEventListener("click", () => {
            popup.remove()
        })
    })
}



//afficher la modale au clic


BtnModify.addEventListener("click", () => {
    createModal();
    generatePage1();
    generatePage2();
    closeModal();
})





//////////////////////////////////////                    MODAL WINDOW

//Page 1

//   1/ RECUPERATION DES ELEMENTS DU DOM

//element général de la popup créé au clic sur BtnModify




const btnTrash = document.querySelector('.btnTrash')
console.log(btnTrash);
// supprimer un projet (fetch delete)

const newProject = document.querySelector('.newProject')
console.log(newProject);
// aller à la page 2 au clic 
//(effacer le contenu de popupContent,
//injecter le code de la page 2 avec innerAdjacentHTML) )

const previousScreen = document.querySelector('.previousScreen')
console.log(previousScreen);
// aller à la page 1 au clic
//(effacer le contenu de popupContent,
//injecter le code de la page 1 avec innerAdjacentHTML) )





//Page 2

//   1/ RECUPERATION DES ELEMENTS DU DOM

const explore = document.getElementById('explore')
console.log(explore);
//input à récupérer pour charger l'aperçu et à enregistrer dans la requet post du fichier Json works

const addPhoto = document.getElementById('addPhoto')
console.log(addPhoto);
//bouton à écouter pour charger l'image de l'apercu dans la div selectPhoto

const selectPhoto = document.querySelector('.selectPhoto')
console.log(selectPhoto);
//au clic sur addPhoto, cette div sera vidée, puis on y injecte un aperçu de l'image

const projectName = document.getElementById('projectName')
console.log(projectName);
//input à écouter (change) pour vérifier que la zone est bien remplie

const projectCategory = document.getElementById('projectCategory')
console.log(projectCategory);
//input à écouter (change) pour vérifier que la selection est bien faite

const addNewProject = document.querySelector('.addNewProject')
console.log(addNewProject);
//bouton à modifier lorsque selectPhoto, projectCategory et projectName sont remplis
//ensuite envoyer une requete post à l'api works

/*
const nameValue = document.getElementById('projectName').value
const photoUrl = document.getElementById('explore').value
const catValue = document.getElementById('projectCategory').value
const createProject = {
    title: nameValue,
    imageUrl: photoUrl,
    categoryId: catValue
}
console.log(createProject);
*/
// construction du Json pour l'envoi du nouveau projet
// à placer dans l'EventListener du bouton addNewProject





/**
 * fonction logout 
*/


const logOut = document.querySelector('.logOut')
console.log(logOut);
// supprime le contenu du local storage

/**
 * Fonction trash
 */




