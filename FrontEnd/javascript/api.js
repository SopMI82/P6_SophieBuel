let works = []
let categories = []

/**
 * Récupération des projets depuis l'API
 *  * @returns 
 */
async function getCategories() {
    const responseCategories = await fetch('http://localhost:5678/api/categories');
    categories = await responseCategories.json();
    console.log(categories);
    return categories;
}

/**
 * Recuperation des categories depuis l'API
 * @returns 
 */
async function getWorks() {
    const responseWorks = await fetch('http://localhost:5678/api/works')
    works = await responseWorks.json();
    console.log(works);
    return works;
}

/**
 * Supprimer un projet dans l'API
 * @param {*} projectId 
 */
function deleteWork(projectId) {
    const token = window.sessionStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    window.location.reload()
}

/**
 * Créer un projet dans l'API
 */
function sendForm() {
    const token = window.sessionStorage.getItem("token");

    fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
        },
        body: projectToAdd,
    })
    console.log(projectToAdd);
}