const cursos = {
    "1": ["Matematica", "Lengua", "Ciencias", "Ingles", "Educación Física"],
    "2": ["Matematica", "Lengua", "Historia", "Ciencias", "Ingles", "Educación Física", "Geografia"],
    "3": ["Matematica", "Lengua", "Historia", "Ciencias", "Ingles", "Educación Física", "Geografia", "Biologia", "Fisica"],
    "4": ["Matematica", "Lengua", "Fisica", "Ingles", "Historia", "Ciencias Sociales", "Biologia", "Educación Física"],
    "5": ["Matematica", "Lengua", "Fisica", "Ingles", "Historia", "Ciencias Sociales", "Biologia", "Geografia", "Educación Física"],
    "6": ["Matematica", "Lengua", "Fisica", "Ingles", "Historia", "Ciencias Sociales", "Biologia", "Geografia", "Educación Física", "Quimica"]
};

const nombresPorCurso = {
    "1": {
        "A": ["Juan Pérez", "Lucía Gómez", "Carlos Ramírez"],
        "B": ["Pedro Martínez", "Ana López", "Santiago Fernández"]
    },
    "2": {
        "A": ["Sofía Fernández", "Matías López", "Valentina Torres"],
        "B": ["Nicolás García", "Emilia Rojas", "Tomás Ortega"]
    },
    "3": {
        "A": ["Diego Castro", "Martina Rojas", "Joaquín Herrera"],
        "B": ["Camila Vázquez", "Lautaro Benítez", "Agustina Molina"]
    },
    "4": {
        "A": ["Camila Duarte", "Ignacio Varela", "Florencia Molina"],
        "B": ["Mateo Solís", "Julieta Giménez", "Lucas Peña"]
    },
    "5": {
        "A": ["Ezequiel Álvarez", "Abril Sánchez", "Tomás Medina"],
        "B": ["Cecilia Godoy", "Ramiro Sosa", "Victoria Blanco"]
    },
    "6": {
        "A": ["Bautista Giménez", "Paula Navarro", "Federico Suárez"],
        "B": ["Gonzalo Paredes", "Melina Herrera", "Franco Díaz"]
    }
};

const boletines = {};

// Generar datos aleatorios para cada curso y división
for (let curso in cursos) {
    boletines[curso] = { "A": [], "B": [] };

    for (let div of ["A", "B"]) {
        nombresPorCurso[curso][div].forEach(nombre => {
            let materias = {};

            cursos[curso].forEach(materia => {
                let nota1 = Math.floor(Math.random() * 6) + 5;
                let nota2 = Math.floor(Math.random() * 6) + 5;
                materias[materia] = [nota1, nota2];
            });

            boletines[curso][div].push({ nombre, materias });
        });
    }
}

function cargarDivisiones() {
    let curso = document.getElementById("curso").value;
    let divisionSelect = document.getElementById("division");
    divisionSelect.innerHTML = '<option value="">-- Seleccionar --</option>';

    if (boletines[curso]) {
        Object.keys(boletines[curso]).forEach(division => {
            let option = document.createElement("option");
            option.value = division;
            option.textContent = `División ${division}`;
            divisionSelect.appendChild(option);
        });
    }
}

function mostrarBoletin() {
    let curso = document.getElementById("curso").value;
    let division = document.getElementById("division").value;
    let boletinDiv = document.getElementById("boletin");
    boletinDiv.innerHTML = "";

    if (boletines[curso] && boletines[curso][division]) {
        boletines[curso][division].forEach(alumno => {
            let tabla = `<h2>${alumno.nombre}</h2><table><thead><tr><th>Materia</th><th>1° Cuatrimestre</th><th>2° Cuatrimestre</th><th>Nota Final</th><th>Editar</th></tr></thead><tbody>`;

            for (let materia in alumno.materias) {
                let notas = alumno.materias[materia];
                let promedio = ((notas[0] + notas[1]) / 2).toFixed(1);
                tabla += `<tr><td>${materia}</td><td>${notas[0]}</td><td>${notas[1]}</td><td class="final">${promedio}</td><td><button class="editar" onclick="editarNotas('${alumno.nombre}', '${materia}', '${curso}', '${division}')">Editar</button></td></tr>`;
            }

            tabla += `</tbody></table>`;
            boletinDiv.innerHTML += tabla;
        });
    } else {
        boletinDiv.innerHTML = "<p>No hay datos disponibles para este curso y división.</p>";
    }
}

function editarNotas(alumnoNombre, materia, curso, division) {
    let alumno = boletines[curso][division].find(a => a.nombre === alumnoNombre);
    let materiaNotas = alumno.materias[materia];

    let nuevoNota1 = prompt(`Editar nota 1° cuatrimestre para ${materia} (${materiaNotas[0]}):`, materiaNotas[0]);
    let nuevoNota2 = prompt(`Editar nota 2° cuatrimestre para ${materia} (${materiaNotas[1]}):`, materiaNotas[1]);

    if (nuevoNota1 !== null && nuevoNota2 !== null) {
        alumno.materias[materia] = [parseInt(nuevoNota1), parseInt(nuevoNota2)];
        mostrarBoletin();
    }
}
