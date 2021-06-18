var correoAdmin;
                const auth = firebase.auth();
                const provider = new firebase.auth.GoogleAuthProvider();
                provider.setCustomParameters({ prompt: "select_account" });
                auth.onAuthStateChanged(
                    usuarioAuth => {
                    if (usuarioAuth && usuarioAuth.email) {
                        email.value = usuarioAuth.email;
                        nombre.value = usuarioAuth.displayName;
                        avatar.src = usuarioAuth.photoURL;
                        const lista1 = document.querySelector("#menuA");
                        var adminC = firebase.database().ref('Usuarios/Admin');
                        adminC.on("value", (snapshot) => {
                        ObjetoAdmin = snapshot.val();
                        correoAdmin=ObjetoAdmin.correo;
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