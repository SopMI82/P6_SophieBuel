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
        //    controlForm(); //doit renvoyer un message d'erreur si un élément manque
        // ne devrait pas être ici, devrait être dans un listener change sur les inputs, pour pouvoir activer le bouton addnexproject
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
        console.log("une erreur est survenue, le projet n'a pas été créé."); // message d'erreur
    }
}

//____________________________________________________BROUILLONS PAS ENCORE FONCTIONNELS_______________________________________________________________

function controlForm() { // vérifie la présence des éléments du formulaire 
    try {
        let photo = document.getElementById('explore').value;
        const explore = document.getElementById('explore');
        explore.addEventListener('change', () => {
            if (!photo) {
                throw new Error("Merci de sélectionner une image.");
            }
        })

        let projectName = document.getElementById('projectName').value;
        const inputProject = document.getElementById('projectName');
        inputProject.addEventListener('change', () => {
            if (!projectName) {
                throw new Error("Merci de renseigner le nom du projet.");
            } 
        })

        let category = document.getElementById('projectCategory').value;
        const baliseSelect = document.getElementById('projectCategory');
        baliseSelect.addEventListener('change', () => {
            if (!category) {
                throw new Error("Merci de sélectionner une catégorie.");
            }
        })
// pour ces 3 conditions, JS renvoie l'erreur dans tous les cas, pourquoi ????
// essayé avec ... === "", ne fonctionne pas non plus

        const token = window.localStorage.getItem("token");
        if (!token) {
            throw new Error("Problème d'authentification : veuillez vous reconnecter.");
        }

        // then / else ? bouton submit : activation et changement de couleur (modifier la classe, enlever "invalidForm")

    } catch (error) {
        console.error(error)
    }
}

//NB : la page refresh trop vite vers l'index une fois le formulaire envoyé,
//malgré le prevent default,
//du coup, je n'ai pas le temps de lire les messages de la console,
//je ne sais donc pas si ça fonctionne !

//15/03 matin : plus de pb de refresh, mais mon fichier ne part plus à l'api
// chercher l'origine du pb ----------OK RESOLU