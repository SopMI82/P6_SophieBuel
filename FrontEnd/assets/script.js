// Récupération des projets depuis l'api
const response = await fetch('http://localhost:5678/api/works')
const works = await response.json();

// Récupération de l'élément du DOM qui accueillera les projets
const gallery = document.querySelector('.gallery');

/**
 * Fonction qui importe les projets de manière dynamique
 * @param {string} works 
 */
function  genererProjects(works)  {
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        // Création d’une balise dédiée à un projet
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
    }
}
genererProjects(works);

//gestion des boutons :

/**
 * Bouton qui gère l'affichage de tous les projets
 */
const btnAll = document.getElementById("allProjects");

btnAll.addEventListener("click", () => {
    gallery.innerHTML = "";
    genererProjects(works);
})

/**
 * Bouton qui gère l'affichage des projets des design d'objet
 */
const btnObjects = document.getElementById("Objects")

btnObjects.addEventListener("click", ()=>{
    const worksObjects = works.filter((work)=>{
        return work.categoryId === 1;
    })
    gallery.innerHTML = "";
    genererProjects(worksObjects);
})

/**
 * Bouton qui gère l'affichage des appartements
 */
const btnAppartments = document.getElementById("Appartments")

btnAppartments.addEventListener("click", () => {
    const worksAppartments = works.filter((work) => {
        return work.categoryId === 2;
    })    
    gallery.innerHTML = "";
    genererProjects(worksAppartments);
})

/**
 * Bouton qui gère l'affichage des Hotels & Restaurants
 */
const btnbToB = document.getElementById("bToB")

btnbToB.addEventListener("click", () => {
    const worksbToB = works.filter((work) => {
        return work.categoryId === 3;
    })
    gallery.innerHTML = "";
    genererProjects(worksbToB);
})