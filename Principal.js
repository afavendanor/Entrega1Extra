const http = require('http');

const opciones = {
    idCurso: {
        demand:true,
        alias: 'i'
    },
    nombreInteresado: {
        demand:true,
        alias: 'n'
    },
    cedulaInteresado: {
        demand:true,
        alias: 'x'
    }
};

const argv = require('yargs')
            .command('inscribir', 'Matricular en un curso', opciones)
            .argv

let cursos = [
    {
        id: 9025,
        nombre: 'Bases de datos',
        duracion: '4 semanas',
        valor: 250000
    },
    {
        id: 9088,
        nombre: 'Fisica mecánica',
        duracion: '4 semanas',
        valor: 380500
    },
    {
        id: 9013,
        nombre: 'Diseño web',
        duracion: '8 semanas',
        valor: 420500
    },
    {
        id: 9090,
        nombre: 'Fundamentos de HTML',
        duracion: '5 semanas',
        valor: 150600
    }
];

/*Mostrar los cursos*/
function imprimirCursos(cursos) {
    if(!argv.i && !argv.n && !argv.x) {
        var index = 1;
        cursos.forEach(curso => {
            setTimeout(
                () => {
                    console.log(curso);
                },
                (index)*2000
            );
            index++;
        });
    }
}

let estudiante = {
    nombre: argv.n,
    cedula: argv.x
}

let mostrarNavegador = (estudiante, curso) => {
    const texto = "El estudiante de nombre " + estudiante.nombre +
                    "\ncon cédula " + estudiante.cedula +
                    "\nSe ha matriculado en el curso llamado " + curso.nombre +
                    "\nel cual tiene una duración de " + curso.duracion +
                    " y un valor de $" + curso.valor ;
        http.createServer(function (req, res) {
            res.write(texto);
            res.end();
        }).listen(8080);
            console.log('server running');

}

function buscarCurso(idCurso) {
    return cursos.find( cursos => cursos.id == idCurso)
}

function inscribir() {
    if(argv.i) {
        let curso = buscarCurso(argv.i);
        if(curso === undefined) {
            console.log('El curso ingresado no existe');
            console.log('Listado de cursos\n', cursos);
        } else {
            mostrarNavegador(estudiante, curso);
        }
    }

}

imprimirCursos(cursos);
inscribir();