import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

export function authGoogle(app) {
  const auth = getAuth(),
    provider = new GoogleAuthProvider(),
    $GoogleBtn = document.querySelector("#GoogleBtn");

  let $userText = document.querySelector("#userName"),
    $accountbtns = document.querySelector("#accountBtns"),
    $accountInfo = document.querySelector("#accountInfo"),
    $accountImg,
    $accountName;

  document.addEventListener("click", (e) => {
    if (e.target.matches("#GoogleBtn")) {
      signInWithPopup(auth, provider)
        .then((res) => {
          localStorage.clear();
          const credential = GoogleAuthProvider.credentialFromResult(res);
          const token = credential.accessToken;
          $accountName = res.user.displayName;
          $accountImg = res.user.photoURL;
          console.log($accountName);
          localStorage.setItem("userPhoto",$accountImg);
          localStorage.setItem("userEmail",$accountName);
          $userText.innerHTML = `<img src="${res.user.photoURL}" style="width: 30px; height: auto;" class="mx-1" border-30>${res.user.displayName}`;
          $accountInfo.classList.remove("d-none");
          $accountbtns.classList.add("d-none");
        })
    }
    if (e.target.matches("#logout")) {
      $accountInfo.classList.add("d-none");
      $accountbtns.classList.remove("d-none")
      signOut(auth);
    }
  })

  onAuthStateChanged(auth, (user) => {
    if (user) {
      $userText.innerHTML = `<img src="${localStorage.getItem("userPhoto")}" style="width: 30px; height: auto;" class="mx-1">${localStorage.getItem("userEmail")}`;
      $accountInfo.classList.remove("d-none");
      $accountbtns.classList.add("d-none");
    } else {
      $accountInfo.classList.add("d-none");
      $accountbtns.classList.remove("d-none")
      console.log(false);
    }
  })
}
