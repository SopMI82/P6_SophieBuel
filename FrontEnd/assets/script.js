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
const main = document.querySelector('main')
const token = window.localStorage.getItem("token");
const sectionPortfolio = document.getElementById('portfolio')
const adminBanner = document.querySelector('.adminBanner')
const logBtn = document.querySelector('.logBtn')

/**
 * Vérifier la présence du token dans le local storage et définir l'affichage en fonction
 * @param {string} token 
 */
function showAdminmode(token) {

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

/**
 * Supprimer le token du local storage
 * @param {string} token 
 */
function eraseToken() {
    const logOut = document.querySelector('.logOut')
    console.log(logOut);
    logOut.addEventListener("click", () => {
        window.localStorage.removeItem("token")
        logBtn.innerHTML = ""
        adminBanner.innerHTML = ""
        BtnModify.remove()
        logBtn.insertAdjacentHTML("afterbegin", `
        <a href="./assets/login.html" class="logIn">login</a>
    `)
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
                <button class="btnTrash" id="${work.id}"><i class="fa-regular fa-trash-can"></i></button>
            </figure>
        `)
    })

    const btnTrash = document.querySelectorAll('.btnTrash')
    console.log(btnTrash);

    btnTrash.forEach(btnTrash => {
        btnTrash.addEventListener('click', (event) => {
            let clickedProject = event.target;
            let projectId = clickedProject.id;
            console.log(projectId);
//            deleteWork(projectId)
        })
    });
};




//////////////////////////////////////                    Modal Window


/**
 * Fonction qui affiche la modale au clic
 */
function runModal() {
    const BtnModify = document.querySelector('.edit')
    console.log(BtnModify);
    BtnModify.addEventListener("click", () => {
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
					<input id="explore"  type="file" accept=".png,.jpeg,jpeg">
                    <div id="falseButton">+ Ajouter photo</div>
					<p>jpg, png : 4mo max</p>
				</div>
				<label for="title">Titre</label>
				<input type="text" name="title" id="projectName">
				<label for="projectCategory">Catégorie :</label>
				<select name="category" id="projectCategory">	            <!--Attention, insérer dynamiquement les <option></option> pour chaque categorie-->
				<div class="lineDecor"></div>
				<input class="addNewProject" type="submit" value="Valider">
			</form>
		</div>
        `)
}


//__________________________________________________FONCTION PRINCIPALE___________________________________

function run() {
    showAdminmode()
    eraseToken()
    getWorks()
        .then((works) => {
            genererProjects(works);
        })
    getCategories()
        .then((categories) => {
            generateBtn(categories)
        })
    runModal();
    genererApercu(works)
}
run()


//____________________________________________________BROUILLONS PAS ENCORE FONCTIONNELS_______________________________________________________________

/*
// supprimer un projet (fetch delete)

async function deletework() {
    const response = await fetch(`http://localhost:5678/api/works/${id}`,
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
        .then(() => {
            genererApercu(works);
        })
}

// Afficher l'apperçu de l'image sélectionnée
// Ne fonctionne pas, la technique ne doit pas être bonne

function recupPhoto() {
    const explore = document.getElementById('explore');
    const selectPhoto = document.querySelector('.selectPhoto');
    console.log(explore);
    console.log(selectPhoto);
    explore.addEventListener('change', () => {
        const file = EventTarget.file;
            const imageSrc = URL.createObjectURL(file);
            selectPhoto.insertAdjacentHTML('beforeend', `
            <img class="prevNewProject" src="${imageSrc}">
        `);
    })    
}
recupPhoto()

// Récupérer les infos pour créer un nouveau projet :

const projectName = document.getElementById('projectName');
console.log(projectName);               //input à écouter (change) pour vérifier que la zone est bien remplie

const projectCategory = document.getElementById('projectCategory');
console.log(projectCategory);           //input à écouter (change) pour vérifier que la selection est bien faite

const addNewProject = document.querySelector('.addNewProject');
console.log(addNewProject);
                                        //couleur du bouton à modifier, et rendre le bouton clicquable lorsque selectPhoto, projectCategory et projectName sont remplis
                                        //au clic envoyer une requete post à l'api works pour créer une nouvelle entrée
                                        // construction du Json pour l'envoi du nouveau projet
                                        // (à placer dans l'EventListener du bouton addNewProject)

const nameValue = document.getElementById('projectName').value;
                                        //donnée à envoyer à l'API works en POST sous la ref "title"

const imageSrc = document.getElementById('explore').value;
                                        //donnée à envoyer à l'API works en POST sous la ref "imageURL"

const catValue = document.getElementById('projectCategory').value;
                                        //donnée à envoyer à l'API works en POST sous la ref "categoryId"

const createProject = {
    id : works.lenght+1,
    title: nameValue,
    imageUrl: photoUrl,
    categoryId: catValue
};

console.log(createProject);
*/
