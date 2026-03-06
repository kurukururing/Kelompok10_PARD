// - index.html -

// validasi form
function validateForm() {
    // form elements
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");

    // Get the values from the input fields and remove extra white spaces.
    let username = usernameInput.value.trim();
    let email = emailInput.value.trim();

    // Validate username input
    if (username === "") {
        document.getElementById("username-error-msg").innerHTML = " Mohon isi Username Anda";
        return false;
    } else {
        document.getElementById("username-error-msg").innerHTML = "";
    }

    // Validate email input
    if (email === "") {
        document.getElementById("email-error-msg").innerHTML = " Mohon masukkan Email Anda";
        return false;
    } else {
        document.getElementById("email-error-msg").innerHTML = "";
    }

    // Validate password
    if (passwordInput.value == "") {
        document.getElementById("password-error-msg").innerHTML = " Mohon masukkan password Anda";
        return false;
    } else if (passwordInput.value.length < 8) {
        document.getElementById("password-error-msg").innerHTML = " Minimal Password 8 karakter";
        return false;
    } else {
        document.getElementById("password-error-msg").innerHTML = "";
    }

    return true;
}

// login
function loginUser(event){
  event.preventDefault();

if(validateForm() == false){
  return false;
  }

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  let id = 1;

  if(userList.length > 0){
  let ids = userList.map(user => user.id);
  id = Math.max(...ids) + 1;
  }

  userList.push({
  id: id,
  username: username,
  email: email,
  password: password
  });

  localStorage.setItem("userList", JSON.stringify(userList));

  localStorage.setItem("loginStatus","true");

  alert("Selamat datang!");

  showLoginSuccess();

  document.getElementById("username").value="";
  document.getElementById("email").value="";
  document.getElementById("password").value="";
}

window.onload = function(){
    let status = localStorage.getItem("loginStatus");

    // jika halaman punya login form
    if(document.getElementById("login-form")){
        if(status === "true"){
            showLoginSuccess();
        }
    }

    // jika halaman punya profile
    if(document.getElementById("profile-section")){
        if(status !== "true"){
            document.getElementById("profile-section").style.display = "none";
            document.getElementById("not-logged").style.display = "block";
        }else{
            loadProfile();
        }
    }
}

function showLoginSuccess(){
  document.getElementById("login-form").style.display = "none";
  document.getElementById("login-success").style.display = "block";
}

// - userpfofile.html -

function loadProfile(){
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    if(userList.length > 0){
        let user = userList[userList.length - 1];
        document.getElementById("current-username").value = user.username;
        document.getElementById("current-email").value = user.email;
    }
}

// delete
function deleteData(index) {
    let userList;
    if (localStorage.getItem("userList") == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem("userList"));
    }

    // konfirmasi
    if (confirm("Apakah Anda yakin ingin keluar?")) {
        userList.splice(index, 1);
        localStorage.setItem("userList", JSON.stringify(userList));
        
        // hapus status login
        localStorage.removeItem("loginStatus");

        // kembali ke halaman utama
        window.location.href = "index.html";
    }
}

// update
function editData() {
    if(validateForm() === false){
        return;
    }
    let newUsername = document.getElementById("username").value.trim();
    let newEmail = document.getElementById("email").value.trim();
    let newPassword = document.getElementById("password").value;
    let userList = JSON.parse(localStorage.getItem("userList")) || [];

    if(userList.length > 0){
        let lastIndex = userList.length - 1;

        userList[lastIndex].username = newUsername;
        userList[lastIndex].email = newEmail;
        userList[lastIndex].password = newPassword;

        localStorage.setItem("userList", JSON.stringify(userList));
        alert("Profil berhasil diperbarui!");
        loadProfile();

        // kosongkan input setelah update
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }
}
