const openNav = document.querySelector(".icon1");
const fermerNav = document.querySelector(".fermer");
const menu = document.querySelector(".menu");

const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");
const form = document.querySelector("form");
let pseudo, email, password, confirmPass;

openNav.addEventListener("click", () => {
    menu.classList.add("monter");
    console.log("hello")
});

fermerNav.addEventListener("click", () => {
    menu.classList.remove("monter");
});

const errorDisplay = (tag, message, valid) =>{
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if(!valid){
     container.classList.add("error");
     span.textContent = message;
  }else{
    container.classList.remove("error");
    span.textContent = "";
  }
}

//On se crée un fonction pour chaque input pour les controlés plus facilement
const pseudoChecker = (value) => {

    if(value.length > 0 && (value.length < 3 || value.length > 20)){
      errorDisplay("pseudo", "Le message doit faire entre 3 et 20 caractères");
      pseudo = null;
    }else if(!value.match(/^[a-zA-Z0-9_.-]*$/)){
      errorDisplay("pseudo", "Pas de caractères speciaux");
      pseudo = null;
    }else{
      errorDisplay("pseudo", "", true);  
      pseudo = value;     
    }

};
const emailChecker = (value) => {
  if(!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)){
    errorDisplay("email", "email incorrect");
    email = null;    
  }else{
    errorDisplay("email", "", true);
    email = value;
  }
};
const passwordChecker = (value) => {
  if(!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)){
    errorDisplay("password", "8 caractères au minimum, 1 chiffre et 1 caractère special");
    progressBar.classList.add("progressRed");
    password = null;
  }else if(value.length < 12){
    errorDisplay("password", "", true)
    progressBar.classList.add("progressBlue");
    password = value;
  }else{
    errorDisplay("password", "", true)
    progressBar.classList.add("progressGreen")
    password = value;
  }
  if(confirmPass) confirmChecker(confirmPass);
};
const confirmChecker = (value) => {
  if(value !== password){
    errorDisplay("confirm", "Aucune correspondance");
    confirmPass = false;
  }else{
    errorDisplay("confirm", "", true)
    confirmPass = true;
  }
};

//Pour chaque input on lui passe un évènement "input" dans la méthode forEach
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(pseudo && email && password && confirmPass){
    const data = {
      pseudo,
      email,
      password
    }
    console.log(data)
  }else{
    alert("veuillez remplir correctement les champs");
  }
})

