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

/**
 * Fonction chargée de publier le nouveau projet
 */
function publishProject() {
    const addNewProject = document.querySelector('.addNewProject');

    addNewProject.addEventListener('click', (event) => {
        event.preventDefault();
        controlForm(); //doit renvoyer un message d'erreur si un élément manque
        sendForm(); //si tout est ok, envoie les données, et affiche un message de confirmation
    })
}

function sendForm() {
    try {
        const explore = document.getElementById('explore');
        const catValue = document.getElementById('projectCategory').value;
        const nameValue = document.getElementById('projectName').value;

        const projectToAdd = new FormData();
        projectToAdd.append("image", explore.files[0]);
        projectToAdd.append("title", nameValue);
        projectToAdd.append("category", catValue);

        const postWork = fetch(`http://localhost:5678/api/works`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json',
            },
            body: projectToAdd,
        })

        if (postWork.ok) {
            console.log("Nouveau projet créé avec succès") // message de confirmation
        }

    } catch (error) {
        console.log("une erreur est survenue, le projet n'a pas été créé."); // message d'erreur
    }
}

//____________________________________________________BROUILLONS PAS ENCORE FONCTIONNELS_______________________________________________________________

function controlForm() { // vérifie la présence des éléments du formulaire 
    try {
        const baliseSelect = document.getElementById('projectCategory');
        if (baliseSelect = "") {
            throw new Error("Merci de sélectionner une catégorie.");
        }

        const projectName = document.getElementById('projectName');
        if (projectName = "") {
            throw new Error("Merci de renseigner le nom du projet.");
        }
        const selectPhoto = document.getElementById('explore');
        if (selectPhoto.length < 0) {
            throw new Error("Merci de sélectionner une image.");
        }

        const token = window.localStorage.getItem("token");
        if (!token) {
            throw new Error("Problème d'authentification : veuillez vous reconnecter.");
        }
        //        else : bouton submit : activation et changement de couleur
    } catch (error) {
        console.error(error)
    }
}

//NB : la page refresh trop vite vers l'index,
//malgré le prevent default, du coup,
//je n'ai pas le temps de lire les messages de la console,
//je ne sais donc pas si ça fonctionne !