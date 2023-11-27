import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

let $inputs = document.querySelectorAll(".inputText");
let $testText = document.querySelector("#userName");
let $userText = document.querySelector("#userName");
let $accountbtns = document.querySelector("#accountBtns");
let $accountInfo = document.querySelector("#accountInfo");
let $accountEmail;

$inputs.forEach((el) => {
  let $small = document.createElement("small");
  $small.id = `${el.name}-error`;
  $small.innerText = `Inserta un ${el.name} valido`;
  $small.classList.add("bg-danger", "my-1", "text-center", "d-block", "d-none");
  el.insertAdjacentElement("afterend", $small);
});

document.addEventListener("input", (e) => {
  let $smallError = document.querySelector(`#${e.target.name}-error`);
  let condition;

  if (e.target.name === "Password") {
    condition = e.target.value.length < 6;
  } else {
    if (e.target.pattern) {
      let regex = new RegExp(e.target.pattern);
      condition = !regex.exec(e.target.value);
      if (condition === true) {
        e.target.classList.add("inputtextError");
        e.target.classList.remove("inputText");
      } else {
        e.target.classList.remove("inputtextError");
        e.target.classList.add("inputText");
      }
    } else {
      condition = e.target.value === "";
    }
  }
  return condition
    ? $smallError.classList.remove("d-none")
    : $smallError.classList.add("d-none");
});

export function authEmail(app) {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      $userText.innerHTML = `<img src="../imgs/UserImg.png" style="width: 30px; height: auto;" class="mx-1">${localStorage.getItem("userEmail")}`;
      $accountInfo.classList.remove("d-none");
      $accountbtns.classList.add("d-none");
    } else {
      $accountInfo.classList.add("d-none");
      $accountbtns.classList.remove("d-none")
      console.log(false);
    }
  });

  document.addEventListener("submit", (e) => {
    e.preventDefault();
    let $form = e.target;
    if ($form.matches("#form-signin")) {
      createUserWithEmailAndPassword(
        auth,
        $form.Email.value,
        $form.Password.value
      )
        .then((res) => {
          console.log(res);
          $testText.innerHTML = `<p>Usuario creado</b></p>`;
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          $testText.innerHTML = `<p>Ocurrio un error al crear la cuenta <b>${err.message}</b></p>`;
          $form.nombre.focus();
        });
    }

    if ($form.matches("#form-login")) {
      signInWithEmailAndPassword(auth, $form.Email.value, $form.Password.value)
        .then((res) => {
          console.log(res);
          $accountEmail = res.user.email;
          localStorage.setItem("userEmail", $accountEmail)
          $userText.innerHTML = `<img src="../imgs/UserImg.png" style="width: 30px; height: auto;" class="mx-1">${$form.Email.value}`;
          $accountInfo.classList.remove("d-none");
          $accountbtns.classList.add("d-none");
          $form.reset();
        })
        .catch((err) => {
          $testText.innerHTML = `<p>Ocurrio un error al iniciar sesión <b>${err.message}</b></p>`;
          $form.pass.focus();
        });
    }

    document.addEventListener("click", (e) => {
      if (e.target.matches("#logout")) {
        $accountInfo.classList.add("d-none");
        $accountbtns.classList.remove("d-none")
        signOut(auth);
      }
    });
  });
}
