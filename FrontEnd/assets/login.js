const btnConnect = document.getElementById("btnConnect");
console.log(btnConnect);


//Ajout de la fonction Login

btnConnect.addEventListener("click", (event) => {
    event.preventDefault();

    //verifyForm()

    const email = document.getElementById("email").value;
    console.log(email);
    const password = document.getElementById("password").value;
    console.log(password);

    const login = {
        email: email,
        password: password
    }
    console.log(login);

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
    })

})