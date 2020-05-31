//login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['mail'].value;
    const password = loginForm['psw'].value;

    auth.signInWithEmailAndPassword(email, password)
})

//logout

const signOut = document.getElementById('signOut');
signOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})

//auth state change listener

const loggedIn = document.querySelectorAll('.userYES');
const loggedOut = document.querySelectorAll('.userNO');

const formLogin = document.getElementById('signin');
const textsSection = document.getElementById('texts');

const textContainer = document.querySelector('.textContainer');

auth.onAuthStateChanged(user => {
    console.log(user);
    if(user) {
        var userId = firebase.auth().currentUser.uid;
        var reference = database.ref('users/' + userId);
        reference.on('value', function(snapshot) {
            //console.log(snapshot.val());
            let html = '';
            snapshot.forEach(element => {
                var date = element.child('date').val();
                var text = element.child('text').val();
                const div = `
                    <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
                        <div class="resume-content">
                        <h3 class="mb-0">${date}</h3>
                            <p>${text}</p>
                        </div>
                    </div>
                `;
                html += div;
            });

            textContainer.innerHTML = html;
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        loggedIn.forEach(item => item.style.display = 'block');
        loggedOut.forEach(item => item.style.display = 'none');
        //
        formLogin.style.display = 'none';
        textsSection.style.display = 'block';
    } else {
        loggedIn.forEach(item => item.style.display = 'none');
        loggedOut.forEach(item => item.style.display = 'block');
        //
        formLogin.style.display = 'block';
        textsSection.style.display = 'none';

        let html = '';
        textContainer.innerHTML = html;
    }
})