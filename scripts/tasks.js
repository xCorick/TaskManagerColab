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

                const card = document.createElement("div");
                card.className = "task";

                card.innerHTML = `
                    <h3>${tarea.titulo}</h3>
                    <p>Asignado a: ${tarea.usuario}</p>
                    <button onclick="cambiarEstado(${tarea.id})">
                        Cambiar Estado
                    </button>
                `;

                if(tarea.estado === "Pendiente"){
                    document.getElementById("pendiente").appendChild(card);
                }
                else if(tarea.estado === "En Proceso"){
                    document.getElementById("proceso").appendChild(card);
                }
                else{
                    document.getElementById("completada").appendChild(card);
                }
            });
        }

        registrarActividad("Sistema iniciado.");
        renderizar();
