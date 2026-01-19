const API_URL = "http://localhost:3000";

// LOGIN
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if (!username || !password) {
        msg.innerText = "Please fill all fields";
        return;
    }

    try {
        const res = await fetch(API_URL + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            msg.style.color = "green";
            msg.innerText = data.message;

            // ไปหน้า dashboard (ตัวอย่าง)
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {
            msg.style.color = "red";
            msg.innerText = data.message;
        }

    } catch (err) {
        msg.innerText = "Server error";
    }
}

// REGISTER
async function register() {
    const username = document.getElementById("reg_username").value;
    const password = document.getElementById("reg_password").value;
    const msg = document.getElementById("reg_msg");

    if (!username || !password) {
        msg.innerText = "Please fill all fields";
        return;
    }

    try {
        const res = await fetch(API_URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            msg.style.color = "green";
            msg.innerText = "Register Success";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);

        } else {
            msg.style.color = "red";
            msg.innerText = data.message;
        }

    } catch (err) {
        msg.innerText = "Server error";
    }
}
