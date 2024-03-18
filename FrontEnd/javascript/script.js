function run() {
    getWorks()
        .then((works) => {
            genererProjects(works);
        })
    getCategories()
        .then((categories) => {
            generateBtn(categories)
        })
    showAdminmode()
}

run()



////////////////////// EN COURS
const projectToAdd = new FormData();

/**
 * Fonction chargée de publier le nouveau projet
 */
function publishProject() {
    const addNewProject = document.querySelector('.addNewProject');

    addNewProject.addEventListener('click', (event) => {
        event.preventDefault();
        sendForm(); //si tout est ok, envoie les données, et affiche un message de confirmation
    })
}

/**
 * Fonction chargée d'envoyer les données à l'API pour construire un nouveau projet
 */
function sendForm() {
    try {
        const token = window.localStorage.getItem("token");

        const postWork = fetch(`http://localhost:5678/api/works`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json',
            },
            body: projectToAdd,
        })

        if (postWork.ok) {
            console.log("Nouveau projet créé avec succès") // message de confirmation, ne s'affiche pas
            // actualiser gallerie et minigallerie
        }

    } catch (error) {
        console.log("une erreur est survenue, le projet n'a pas été créé.");
    }
}



/**
 * Vérifie que le formulaire est correctement rempli et construit le projectToAdd
 */
function controlForm() {
    try {
        const explore = document.getElementById('explore');
        const inputProject = document.getElementById('projectName');
        const baliseSelect = document.getElementById('projectCategory');

        explore.addEventListener('change', () => {
            const photo = document.getElementById('explore').value;
            if (!photo) {
                throw new Error("Merci de sélectionner une image.");
            }
            projectToAdd.append("image", explore.files[0]);
            enable()
        })

        inputProject.addEventListener('change', () => {
            const projectName = document.getElementById('projectName').value;
            if (!projectName) {
                throw new Error("Merci de renseigner le nom du projet.");
            }
            projectToAdd.append("title", projectName);
            enable()
        })

        baliseSelect.addEventListener('change', () => {
            const category = document.getElementById('projectCategory').value;
            if (!category) {
                throw new Error("Merci de sélectionner une catégorie.");
            }
            projectToAdd.append("category", category);
            enable()
        })

    } catch (error) {
        console.error(error)
    }
}

/**
 * Fonction qui active le bouton de soumission du formulaire
 */
function enable () {
    const btn = document.getElementById('addNewProject');
    const category = projectToAdd.get('category');
    const title = projectToAdd.get('title');
    const image = projectToAdd.get('image');

    if (!!category&!!title&!!image) {
        btn.removeAttribute('disabled')
    }
}
