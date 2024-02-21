const btnConnect = document.getElementById("btnConnect");
const errorBox = document.querySelector('.errorBox')


btnConnect.addEventListener("click", (event) => {
    event.preventDefault();
    errorBox.innerHTML = ""
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const login = {
        email: email,
        password: password
    }
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(login)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.token) {
                const token = data.token
                localStorage.setItem('token', token)
                console.log(localStorage);
                errorBox.insertAdjacentHTML('beforeend', "<p>Identification réussie, token enregistré</p>")
            }
        })
        .catch(error => {
            errorBox.insertAdjacentHTML('beforeend', "<p>Email ou mot de passe incorrect</p>")
        });
})