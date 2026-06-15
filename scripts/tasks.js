const tareas = [
            {
                id:1,
                titulo:"Diseñar interfaz",
                usuario:"Maria",
                estado:"Pendiente"
            },
            {
                id:2,
                titulo:"Crear base de datos",
                usuario:"Alex",
                estado:"En Proceso"
            },
            {
                id:3,
                titulo:"Desarrollo de API",
                usuario:"Adrian",
                estado:"En Proceso"
            },
             {
                id:4,
                titulo:"Pruebas del sistema",
                usuario:"Friancisco",
                estado:"Pendiente"
            }
        ];

        const usuarios = [
            "Alex",
            "Adrian",
            "María",
            "Francisco"
        ];

        const activityList = document.getElementById("activityList");

        function registrarActividad(texto){
            const li = document.createElement("li");
            li.textContent = texto;
            activityList.prepend(li);
        }

        function cambiarEstado(id){

            const tarea = tareas.find(t => t.id === id);

            if(tarea.estado === "Pendiente"){
                tarea.estado = "En Proceso";
            }
            else if(tarea.estado === "En Proceso"){
                tarea.estado = "Completada";
            }
            else{
                tarea.estado = "Pendiente";
            }

            registrarActividad(
                `${tarea.titulo} fue cambiada a "${tarea.estado}" por ${tarea.usuario}`
            );

            renderizar();
        }

        function renderizar(){

            document.getElementById("pendiente").innerHTML = "";
            document.getElementById("proceso").innerHTML = "";
            document.getElementById("completada").innerHTML = "";

            tareas.forEach(tarea => {

                let botonTexto = "";
                let botonClase = "";

                if(tarea.estado === "Pendiente"){
                    botonTexto = "▶ Iniciar";
                    botonClase = "btn-pendiente";
                }
                else if(tarea.estado === "En Proceso"){
                    botonTexto = "✓ Completar";
                    botonClase = "btn-proceso";
                }
                else{
                    botonTexto = "↺ Reabrir";
                    botonClase = "btn-completada";
                }

                const card = document.createElement("div");

                card.className =
                `task ${tarea.estado
                    .replace(/\s/g, "")
                    .toLowerCase()}`;

                card.innerHTML = `
                    <h3>${tarea.titulo}</h3>

                    <p>
                        <strong>Asignado a:</strong>
                        ${tarea.usuario}
                    </p>

                    <button
                        class="${botonClase}"
                        onclick="cambiarEstado(${tarea.id})">
                        ${botonTexto}
                    </button>

                    ${
                        tarea.estado === "Completada"
                        ?
                        `
                        <button
                            class="delete-btn"
                            onclick="eliminarTarea(${tarea.id})">
                            🗑 Eliminar
                        </button>
                        `
                        :
                        ""
                    }
                `;

                if(tarea.estado === "Pendiente"){
                    document
                        .getElementById("pendiente")
                        .appendChild(card);
                }
                else if(tarea.estado === "En Proceso"){
                    document
                        .getElementById("proceso")
                        .appendChild(card);
                }
                else{
                    document
                        .getElementById("completada")
                        .appendChild(card);
                }

            });

            actualizarEstadisticas();
        }


        const selectUsuario =
        document.getElementById("usuarioTarea");

        usuarios.forEach(usuario => {

            const option =
            document.createElement("option");

            option.value = usuario;
            option.textContent = usuario;

            selectUsuario.appendChild(option);

        });



        function agregarTarea(){

        const titulo =
        document.getElementById("tituloTarea").value;

        const usuario =
        document.getElementById("usuarioTarea").value;

        if(titulo.trim() === ""){
            alert("Ingrese un nombre");
            return;
        }

        const nuevaTarea = {
            id: Date.now(),
            titulo,
            usuario,
            estado: "Pendiente"
        };

        tareas.push(nuevaTarea);

        registrarActividad(
            `Nueva tarea "${titulo}" asignada a ${usuario}`
        );

        document.getElementById("tituloTarea").value = "";

        renderizar();
    }




    function actualizarEstadisticas(){

    const pendientes =
        tareas.filter(
            t => t.estado === "Pendiente"
        ).length;

    const proceso =
        tareas.filter(
            t => t.estado === "En Proceso"
        ).length;

    const completadas =
        tareas.filter(
            t => t.estado === "Completada"
        ).length;

    document.getElementById("totalTareas")
        .textContent = tareas.length;

    document.getElementById("pendientesCount")
        .textContent = pendientes;

    document.getElementById("procesoCount")
        .textContent = proceso;

    document.getElementById("completadasCount")
        .textContent = completadas;
}


        function eliminarTarea(id){

            const indice =
                tareas.findIndex(
                    t => t.id === id
                );

            if(indice !== -1){

                registrarActividad(
                    `La tarea "${tareas[indice].titulo}"
                    fue eliminada`
                );

                tareas.splice(indice,1);

                renderizar();
            }
        }



        registrarActividad("Sistema iniciado.");
        renderizar();
