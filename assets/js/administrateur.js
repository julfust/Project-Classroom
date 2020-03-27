//Initialisation de l'application
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCvIsah7MPvXALU1hiilY6pjzm7UNZi9zc",
    authDomain: "project-classroom-c1da1.firebaseapp.com",
    databaseURL: "https://project-classroom-c1da1.firebaseio.com",
    projectId: "project-classroom-c1da1",
    storageBucket: "project-classroom-c1da1.appspot.com",
    messagingSenderId: "613309391988",
    appId: "1:613309391988:web:87116cee59aff788fe5d21"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialisation des gestionnaires d'événement
  //Fonction: rajoute un utilisateur dans la base donnée
$('#new-user-form').on('submit', onAddUser);

function onAddUser (event){
    event.preventDefault();

    //Clé alétoire générer pour l'utilisateur
    let userId =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    let nom = $('#nom').val();
    let tel = $('#tel').val();
    let sexe = $("input[name='sexe']:checked").val();


    //Utilisation de la clé pour créer un noeud propre a chaque utilisateur
    firebase.database().ref('users/' +userId+ '/').push({
        nom,
        tel,
        sexe
    })
}

//Probleme on ne peut pas recuprer les données en mettant la clé dans la ref
//Solution: trouver comment récupérer la clé alpha numerique de base générée par firebase
firebase.database().ref('users/').on('value', function (snapshot) {

    $('#users').empty();    

    let content = '';
    snapshot.forEach(function(item) {
        const user = item.val()
        content += `<tr>
                        <td>${user.nom}</td>
                        <td>${user.tel}</td>
                        <td>${user.sexe}</td>
                        <td><Button><i class="fas fa-pencil-alt"></i></Button><button><i class="fas fa-times"></i></button></td>
                    </tr>`;
    });

    $('#users').append(content);
})

$('#delete').click(function(){
    firebase.database().ref('users/').set(null);
})

//Gestion router: gestion classe/gestion des plannings
$('#classroom-section-title').click(function(){
    $('#classroom-section-title').css("height", "50px");
    $('#planning-section-title').css("height", "35px");
    $('#classroom-section').css("display", "block");
    $('#planning-section').css("display", "none");
})

$('#planning-section-title').click(function(){
    $('#classroom-section-title').css("height", "35px");
    $('#planning-section-title').css("height", "50px");
    $('#classroom-section').css("display", "none");
    $('#planning-section').css("display", "block");
})