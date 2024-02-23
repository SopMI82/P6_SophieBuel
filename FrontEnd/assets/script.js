//import { ajoutListenersAvis } from "./login.js";

// Récupération des projets depuis l'api
const responseCategories = await fetch('http://localhost:5678/api/categories')
const categories = await responseCategories.json();

const responseWorks = await fetch('http://localhost:5678/api/works')
const works = await responseWorks.json();

// Récupération des éléments du DOM qui accueilleront les projets
const gallery = document.querySelector('.gallery');
const miniGallery = document.querySelector(".miniGallery");
console.log(miniGallery);

/**
 * Fonction qui importe les projets de manière dynamique
 * @param {Array} works 
 */
function genererProjects(works) {
    works.forEach(work => {
        gallery.insertAdjacentHTML('beforeend',`
            <figure>
                <img src="${work.imageUrl}">
                <figcaption>${work.title}</figcaption>
            </figure>
        `)
    });
}
genererProjects(works);

//gestion des boutons :

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
const btnAll = document.getElementById("0");

btnAll.addEventListener("click", () => {
    gallery.innerHTML = "";
    genererProjects(works);
})

/**
 * Générer l'affichage de la gallerie dans la popup
 */
function genererApercu(works) {
    works.forEach(work => {
        miniGallery.insertAdjacentHTML('beforeend',`
            <figure>
                <img src="${work.imageUrl}">
                <button class="btnTrash"><i class="fa-regular fa-trash-can"></i></button>
            </figure>
        `)
    });
}
genererApercu(works);

//////////////////////////////////////                    ADMIN MODE

//   1/ RECUPERATION DES ELEMENTS DU DOM
const BtnModify = document.querySelector('.edit')
console.log(BtnModify); 
// crée le code de modalWindow et popupContent (innerAdjacentHTML)

const adminElements = document.querySelector('.masked')
console.log(adminElements); 
// regroupe les éléments à faire apparaitre ou disparaitre les éléments du mode admin

const logOut = document.querySelector('.logOut')
console.log(logOut); 
// supprime le contenu du local storage

//////////////////////////////////////                    MODAL WINDOW

//Page 1

//   1/ RECUPERATION DES ELEMENTS DU DOM
const modalWindow = document.querySelector('.popup')
console.log(modalWindow); 
//element général de la popup créé au clic sur BtnModify

const popupContent = document.querySelector('.popupContent')
console.log(popupContent); 
// container pour navpopup + page 1 et page 2 (innerAdjacentHTML)

const closePopup = document.querySelector('.closePopup')
console.log(closePopup); 
// fermer la modale (supprimer le html modalWindow)

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

const nameValue = document.getElementById('projectName').value
const photoUrl = document.getElementById('explore').value
const catValue = document.getElementById('projectCategory').value
const createProject = {
    title: nameValue,
    imageUrl: photoUrl,
    categoryId: catValue
}
console.log(createProject);
// construction du Json pour l'envoi du nouveau projet
// à placer dans l'EventListener du bouton addNewProject



/**
 * fonction à créer pour afficher/masquer les éléments admin
 */

/**
 * fonction logout 
*/

/**
 * Fonction trash
 */