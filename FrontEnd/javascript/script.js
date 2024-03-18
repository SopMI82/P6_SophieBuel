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
    checkContact()
}

run()