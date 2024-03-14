/**
 * Fonction qui affiche la modale au clic
 */
function displayModal() {
    createModal();
    generatePage1();
}


/**
 * Fonction qui crée le conteneur de la page modale
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
 * Fonction qui crée la structure de la première page de la modale
 */
function generatePage1(event) {
    builtP1();
    genererApercu(works);
    generatePage2();
    closeModal();
}

/**
 * Fonction qui crée le contenu de la première page de la modale
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
                <button onClick="removeProject()" class="btnTrash" id="${work.id}"><i class="fa-regular fa-trash-can"></i></button>
            </figure>
        `);
    })
        const btnTrash = document.querySelectorAll('.btnTrash');
    
        btnTrash.forEach(btnTrash => {
            btnTrash.addEventListener('click', (event) => {
                event.preventDefault();
                let clickedProject = event.target.parentNode;
                let projectId = clickedProject.id;
                deleteWork(projectId);
            })
        });
    };

/**
 * Fonction qui crée la structure de la deuxième page de la modale
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
 * Fonction qui crée le contenu de la deuxième page de la modale
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
                    <option value="">Choisir une catégorie</option>        
				<div class="lineDecor"></div>
				<input class="addNewProject" type="submit" value="Valider">
			</form>
		</div>
        `)
    showPreview()
    generateOptions(categories)
    publishProject()
}

/**
 * Fonction qui affiche l'aperçu de l'image sélectionnée
 */
function showPreview() {
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

/**
 * fonction qui gère le clic sur la croix pour la fermeture de la modale
 */
function closeModal(event) {
    const closePopup = document.querySelector('.closePopup')
    const popup = document.querySelector('.popup')
    closePopup.addEventListener("click", () => {
        popup.remove()
    })
}

/**
 * fonction qui gère le clic sur la flèche pour revenir à l'écran précédent
 */
function returnPrevious(event) {
    const previousScreen = document.querySelector('.previousScreen')
    previousScreen.addEventListener('click', () => {
        generatePage1();
    })
}