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
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(login)
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        
        } else {
            throw new Error('pas de reponse du serveur')
        }
    })
    .then (data => {
        console.log(data)
        if (data.token) {
            const token = data.token
            localStorage.setItem('token', token)
            console.log(token);
        }
    })
    .catch(error => {
        const errorBox = document.querySelector('.errorBox')
        console.log(errorBox);
        errorBox.insertAdjacentHTML('beforeend', "<p>Email ou mot de passe incorrect</p>")
    });
})