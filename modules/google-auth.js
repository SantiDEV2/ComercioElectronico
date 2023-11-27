import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

export function authGoogle(app){
  const auth = getAuth(),
  provider = new GoogleAuthProvider(),
  $GoogleBtn = document.querySelector("#GoogleBtn");

  let $userText = document.querySelector("#userName"),
  $accountbtns = document.querySelector("#accountBtns"),
  $accountInfo = document.querySelector("#accountInfo");

  onAuthStateChanged(auth,(user) =>{
    if (user) {
      console.log(true);
    } else {
      console.log(false);
    }
  })

  document.addEventListener("click",(e) =>{
    if(e.target.matches("#GoogleBtn"))
    {
      signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        $userText.innerHTML = `<img src="../imgs/UserImg.png" style="width: 30px; height: auto;" class="mx-1">${res.user.displayName}`;
        $accountInfo.classList.remove("d-none");
        $accountbtns.classList.add("d-none");
        console.log(res);
        console.log(res.user);
      })
    }
    if(e.target.matches("#logout"))
    {
      $accountInfo.classList.add("d-none");
      $accountbtns.classList.remove("d-none")
      signOut(auth);
    }
  })
}