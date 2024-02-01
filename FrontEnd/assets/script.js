// Récupération des projets depuis l'api
const response = await fetch('http://localhost:5678/api/works')
const works = await response.json();

/**
 * Fonction qui importe les projets de manière dynamique
 * @param {string} works 
 */
function  genererProjects(works)  {
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        // Récupération de l'élément du DOM qui accueillera les projets
        const gallery = document.querySelector('.gallery');
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

