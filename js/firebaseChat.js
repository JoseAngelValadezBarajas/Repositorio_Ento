var correoAdmin;
                const lista = document.querySelector("#lista");
                const auth = firebase.auth();
                const provider = new firebase.auth.GoogleAuthProvider();
                var Userg;
                document.querySelector("#Out-Chat");
                provider.setCustomParameters({ prompt: "select_account" });
                auth.onAuthStateChanged(
                    usuarioAuth => {
                    if (usuarioAuth && usuarioAuth.email) {
                        Userg=usuarioAuth; 
                        mostrarChat();
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
                            <li><a class="MenuA1" href="GaleriaUser.html">Galeria</a></li>
                            <li><a class="MenuA1" href="Chat.html">Foro</a></li>
                            <li><a class="MenuA1" href="Perfil.html">Perfil</a></li>
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
                function Chattear(){
                    const formulario=document.querySelector("#formulario-chat");
                    const inputChat=document.querySelector("#input-chat");
                    const auth1 = firebase.auth();
                    const provider1 = new firebase.auth.GoogleAuthProvider();
                    provider1.setCustomParameters({ prompt: "select_account" });
                    auth1.onAuthStateChanged(
                    usuarioAuth => {
                    if (usuarioAuth && usuarioAuth.email) {
                        console.log(usuarioAuth);
                        lista.innerHTML=" ";
                        contenidoChat(usuarioAuth);
                    } else {
                        auth1.signInWithRedirect(provider1); 
                    }
                    },
                    procesaError);
                    const contenidoChat=(usuarioAuth)=>{
                    firebase.firestore().collection("Chat").add({texto:inputChat.value,nombre:usuarioAuth.displayName,fecha: Date.now()})
                    .then(res=>{console.log("Listo")})
                    .catch(e=>console.log(e))}
                }
                function mostrarChat()
                {
                    console.log(Userg);
                        firebase.firestore().collection("Chat").orderBy("fecha")
                        .onSnapshot(query=>{
                        //console.log(query)
                        query.forEach(doc=> {
                            console.log(doc.data().texto);
                            lista.innerHTML +=
                                `<li class="fila">
                                    <strong class="primario">
                                        ${doc.data().nombre}
                                    </strong>
                                    <span class="secundario">
                                        ${doc.data().texto}
                                    </span>
                                </li>`;
                        })
                    })
                }