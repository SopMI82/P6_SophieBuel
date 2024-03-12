let works = []
let categories = []

// Récupération des projets depuis l'api
async function getCategories() {
    const responseCategories = await fetch('http://localhost:5678/api/categories');
    categories = await responseCategories.json();
    console.log(categories);
    return categories;
}

async function getWorks() {
    const responseWorks = await fetch('http://localhost:5678/api/works')
    works = await responseWorks.json();
    console.log(works);
    return works;
}

// Récupération des éléments du DOM
const gallery = document.querySelector('.gallery');
const btnAll = document.getElementById("0");
const main = document.querySelector('main');
const token = window.localStorage.getItem("token");
const filters = document.getElementById('filters');
const logBtn = document.querySelector('.logBtn');

function displayModal() {
    createModal();
    generatePage1();
}

function displayEditModal() {
    const btn = `<button onClick="displayModal()" class="edit"><i class="fa-regular fa-pen-to-square"></i>modifier</button>`;
    return btn;
}

/**
 * Vérifier la présence du token dans le local storage et définir l'affichage en fonction
 */
function showAdminmode() {

    const token = window.localStorage.getItem("token");
    const adminBanner = document.querySelector('.adminBanner')
    const btnEdit = document.getElementById('edit')

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
        btnEdit.insertAdjacentHTML("afterbegin", displayEditModal())
        filters.style.display = "none"
        eraseToken();

    } else {
        filters.style.display = "flex"
        adminBanner.innerHTML = ""
        btnEdit.remove()
        logBtn.innerHTML = ""
        logBtn.insertAdjacentHTML("afterbegin", `
        <a href="./assets/login.html" class="logIn">login</a>
    `)
    }
}

/**
 * Supprimer le token du local storage
 * @param {string} token 
 */
function eraseToken(token) {

    const logOut = document.querySelector('.logOut');
    console.log(logOut);
    logOut.addEventListener("click", () => {
        window.localStorage.removeItem("token");
        showAdminmode(token);
    })
}

/**
 * Fonction qui importe les projets de manière dynamique
 * @param {Array} works 
 */
async function genererProjects(works) {
    works.forEach(work => {
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
    miniGallery.innerHTML = "";

    works.forEach(work => {
        miniGallery.insertAdjacentHTML('beforeend', `
            <figure>
                <img src="${work.imageUrl}">
                <button class="btnTrash" id="${work.id}"><i class="fa-regular fa-trash-can"></i></button>
            </figure>
        `);
    })

    const btnTrash = document.querySelectorAll('.btnTrash');
    console.log(btnTrash);

    btnTrash.forEach(btnTrash => {
        btnTrash.addEventListener('click', (event) => {
            event.preventDefault();
            let clickedProject = event.target.parentNode;
            console.log(clickedProject);
            let projectId = clickedProject.id;
            console.log(projectId);
            deleteWork(projectId);
        })
    });
};

// supprimer un projet (fetch delete)

function deleteWork(projectId) {
    const token = window.localStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(() => {
            genererApercu(works);
        })
}





//////////////////////////////////////                    Modal Window


/**
 * Fonction qui affiche la modale au clic
 */
function runModal() {
    const BtnModify = document.querySelector('.edit')
    console.log(BtnModify);
    btnEdit.addEventListener("click", () => {
        createModal();
        generatePage1();
    })
}

/**
 * Sous-fonction qui crée le conteneur de la page modale
 */
function createModal(event) {
    main.insertAdjacentHTML("beforeend", `
        <div class="popup">
            <div class="popupContent">
            </div>
        </div>
        `)
}

/**
 * Sous-fonction qui crée la structure de la première page de la modale
 */
function generatePage1(event) {
    builtP1();
    genererApercu(works);
    generatePage2();
    closeModal();
}

/**
 * Sous-fonction qui crée la structure de la deuxième page de la modale
 */
function generatePage2(event) {
    const newProject = document.querySelector('.newProject')
    newProject.addEventListener("click", (event) => {
        event.preventDefault();
        builtP2();
        closeModal();
        returnPrevious()
    })
}

/**
 * Sous-fonction qui gère le clic sur la flèche pour revenir à l'écran précédent
 */
function returnPrevious(event) {
    const previousScreen = document.querySelector('.previousScreen')
    previousScreen.addEventListener('click', () => {
        generatePage1();
    })
}

/**
 * Sous-fonction qui gère la fermeture de la modale
 */
function closeModal(event) {
    const closePopup = document.querySelector('.closePopup')
    const popup = document.querySelector('.popup')
    closePopup.addEventListener("click", () => {
        popup.remove()
    })
}

/**
 * Sous-fonction qui crée le contenu de la première page de la modale
 */
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

/**
 * Sous-fonction qui crée le contenu de la deuxième page de la modale
 */
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
					<input id="explore" type="file" accept=".png,.jpeg,.jpeg">
                    <div id="btnAddPhoto">+ Ajouter photo</div>
					<p>jpg, png : 4mo max</p>
                    <img class="prevNewProject" src="#">
				</div>
				<label for="title">Titre</label>
				<input type="text" name="title" id="projectName">
				<label for="projectCategory">Catégorie :</label>
				<select name="category" id="projectCategory">
                    <option value="">Choisir une catégorie</option>            <!--Attention, insérer dynamiquement les <option></option> pour chaque categorie-->
				<div class="lineDecor"></div>
				<input class="addNewProject" type="submit" value="Valider">
			</form>
		</div>
        `)
    recupPhoto()
    generateOptions(categories)
    publishProject()
}


//__________________________________________________FONCTION PRINCIPALE___________________________________

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

function recupPhoto() {
    const explore = document.getElementById('explore');
    const prevNewProject = document.querySelector('.prevNewProject');
    console.log(explore);
    console.log(prevNewProject);
    explore.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            prevNewProject.src = URL.createObjectURL(event.target.files[0]);
            prevNewProject.style.display = "block";
        }
    })
}


/**
 * Fonction qui créée les options du formulaire de manière dynamique
 * @param {Array} categories 
 */
function generateOptions(categories) {
    categories.forEach(category => {
        const baliseSelect = document.getElementById('projectCategory');
        console.log(baliseSelect);
        const catOption = `<option value="${category.id}">${category.name}</option>`;
        baliseSelect.insertAdjacentHTML('beforeend', catOption);
        })
}

function publishProject() {
const projectName = document.getElementById('projectName');
console.log(projectName);    
const projectCategory = document.getElementById('projectCategory');
console.log(projectCategory);
const addNewProject = document.querySelector('.addNewProject');
console.log(addNewProject);

addNewProject.addEventListener('click', (event) => {
    event.preventDefault()
// données à récolter pour envoyer à l'API :
    const nameValue = document.getElementById('projectName').value;
    const imageSrc = document.getElementById('explore').value;
    const catValue = document.getElementById('projectCategory').value;
//test :
    console.log(nameValue);
    console.log(imageSrc);
    console.log(catValue);    
})


    const createProject = {
        id: works.lenght + 1,
        title: document.getElementById('explore').value,
        imageUrl: document.getElementById('explore').value,
        categoryId: document.getElementById('projectCategory').value
    };

    console.log(createProject);

}


//____________________________________________________BROUILLONS PAS ENCORE FONCTIONNELS_______________________________________________________________

/*



// Récupérer les infos pour créer un nouveau projet :

               //input à écouter (change) pour vérifier que la zone est bien remplie

           //input à écouter (change) pour vérifier que la selection est bien faite


                                        //couleur du bouton à modifier, et rendre le bouton clicquable lorsque selectPhoto, projectCategory et projectName sont remplis
                                        //au clic envoyer une requete post à l'api works pour créer une nouvelle entrée
                                        // construction du Json pour l'envoi du nouveau projet
                                        // (à placer dans l'EventListener du bouton addNewProject)

                                        //donnée à envoyer à l'API works en POST sous la ref "title"

                                        //donnée à envoyer à l'API works en POST sous la ref "imageURL"

                                        //donnée à envoyer à l'API works en POST sous la ref "categoryId"

const createProject = {
    id : works.lenght+1,
    title: nameValue,
    imageUrl: photoUrl,
    categoryId: catValue
};

console.log(createProject);
*/
