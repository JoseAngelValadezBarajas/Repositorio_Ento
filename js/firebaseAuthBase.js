var correoAdmin;
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
auth.onAuthStateChanged(
    usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) 
    {
        const lista1 = document.querySelector("#menuA");
        var adminC = firebase.database().ref('Usuarios/Admin');
        adminC.on("value", (snapshot) => {
        ObjetoAdmin = snapshot.val();
        correoAdmin=ObjetoAdmin.correo;
        console.log(correoAdmin);
        console.log(usuarioAuth.email);
        if(correoAdmin==usuarioAuth.email)
        {
            console.log("holi")
            lista1.innerHTML +=
                                `<li><a class="MenuaA1" href="index.html">Inicio</a></li>
                                <li><a class="MenuA1" href="Galeria.html">Galeria</a></li>
                                <li><a class="MenuA1" href="GaleriaUser.html">Galeria Usuario</a></li>
                                <li><a class="MenuA1" href="Chat.html">Foro</a></li>
                                <li><a class="MenuA1" href="Perfil.html">Perfil</a></li>
                                <li><button type="button" class="BotonSalir" onclick="terminaSesión()">Terminar Sesión</button></li>`;
        }
        else
        {
            lista1.innerHTML+= `<li><a class="MenuaA1" href="index.html">Inicio</a></li>
            <li><a class="MenuA2" href="GaleriaUser.html">Galeria</a></li>
            <li><a class="MenuA3" href="Chat.html">Foro</a></li>
            <li><a class="MenuA4" href="Perfil.html">Perfil</a></li>
            <li><button type="button" class="BotonSalir" onclick="terminaSesión()">Terminar Sesión</button></li>`;
        }
          });


    } else {
        auth.signInWithRedirect(provider); 
        }
    },
    procesaError);
async function terminaSesión() {
    try {
    window.location.href="index.html";
    await auth.signOut();
    } catch (e) {
    procesaError(e);
    }
}
function procesaError(e) {
    console.log(e);
    alert(e.message);
}

function subirArchivo(){
    var file=document.getElementById("filebut");
    var forma=document.getElementById("datos");
    var NombreSP=forma["NombreSP"].value.trim();
    var Info=forma["Info"].value.trim();
    var archivoS= file.files[0];
    var storageRef=firebase.storage().ref();
    var uploadTask=storageRef.child("Imagenes/"+archivoS.name).put(archivoS);
    sleep(5000);
    storageRef.child("Imagenes/"+archivoS.name).getDownloadURL().then(function(fileURL){
        console.log(fileURL);
        firebase.database().ref('Imagenes/'+ NombreSP).set({
        NombreSP: NombreSP,
        Informa: Info,
        Imag : fileURL
          });
    }); 
}

function modificarArchivo(){
    var fileNuevo=document.getElementById("fileNuevo");
    var forma=document.getElementById("modificar");
    var NombreOriginal=forma["NombreOriginal"].value.trim();
    var NombreNuevo=forma["NombreNuevo"].value.trim();
    var InfoNueva=forma["InfoNueva"].value.trim();
    console.log(NombreNuevo);
    console.log(InfoNueva);
    var archivoNuevo= fileNuevo.files[0];
    var storageRef=firebase.storage().ref();
    var uploadTask=storageRef.child("Imagenes/"+archivoNuevo.name).put(archivoNuevo);
    sleep(5000);
    storageRef.child("Imagenes/"+archivoNuevo.name).getDownloadURL().then(function(fileURL){
        firebase.database().ref('Imagenes/'+ NombreOriginal).update({
        NombreSP: NombreNuevo,
        Informa: InfoNueva,
        Imag : fileURL
          });
    });
}

function borrarArchivo(){
    var forma=document.getElementById("borrar");
    var NombreOriginal=forma["NombreBorrar"].value.trim();
    firebase.database().ref('Imagenes/'+ NombreOriginal).remove();
    } 


function descargarDatos(){
    var contenido;
    const ContenidoUsuario = document.querySelector("#ConenidoUsuario");
    var ConenidoU = firebase.database().ref('Imagenes/');
    ConenidoU.on("value", (snapshot) => {
        ObjetoImagen = snapshot.val();
        var result="";
        for(var key in ObjetoImagen){
            console.log(ObjetoImagen[key].Imag);
            result+='<div class="contenedor">';
            result+= '<img width="200" class="img-galeria" src="'+ObjetoImagen[key].Imag+'"/>';
            result+='<p><h3 class="titulo-ant">'+ObjetoImagen[key].NombreSP+'</h3><h4 class="info-ant">'+ObjetoImagen[key].Informa+'</h4>';
            result+='</div>';
        }
        document.getElementById("ContenidoUsuario").innerHTML=result;
    })
}



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
     if ((new Date().getTime() - start) > milliseconds) {
      break;
     }
    }
   }


