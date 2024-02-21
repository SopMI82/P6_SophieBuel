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
        const project = document.createElement("figure");
        
        // Création des projets
        const photoProjet = document.createElement('img');
        photoProjet.src = work.imageUrl;
        const tagProjet = document.createElement('figcaption');
        tagProjet.innerText = work.title;

        // On rattache les balises à leurs parents
        gallery.appendChild(project);
        project.appendChild(photoProjet);
        project.appendChild(tagProjet);
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
                <i class="fa-regular fa-trash-can"></i>
            </figure>
        `)
    });
}

genererApercu(works);


/**
 * fonction à créer pour afficher/masquer les élémants admin
 */

/**fonction logout */