function run() {
    getWorks()
        .then((works) => {
            genererProjects(works);
        })
        console.log("test"); //ok
    getCategories()
        .then((categories) => {
            generateBtn(categories)
        })
    console.log("test2"); //ok

    showAdminmode()
    console.log("test3"); //ok

    checkContact()
}

run()