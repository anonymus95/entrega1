
//Opciones para ingresar datos del estudiante
const opciones={
    id:{
        demand: true,
        alias:'i'
    },
    nombre:{
        demand: true,
        alias:'n'
    },
    cedula:{
        demand: true,
        alias:'c'
    }

}

//Arreglo que contiene los cursos a ofertar
let cursos=[
    {
        id:1,
        nombre: 'Ingenieria de software',
        duracion: 60,
        valor:125000
    },
    {
        id:2,
        nombre: 'Redes de computadores 1',
        duracion: 80,
        valor: 100000
    },
    {
        id: 3,
        nombre: 'Teoria Organizacional',
        duracion: 100,
        valor: 200000
    }
]


//modulo yargs para entrada de parametros desde consola
const argv=require('yargs').command('inscribir','Inscribir a un estudiante a un curso',opciones).argv

//modulo para generar archivos
const fs=require('fs')

//Solo entra al if, si el estudiante toma la opción de inscribirse al curso
if(argv.i !=null){

    //busca el id del curso al cual el estudiante quiere inscribirse, si lo encuentra retorna un objeto
    let cur= cursos.find(idCurso=>idCurso.id==argv.i)

    //función que permite inscribir al estudiante a un curso
    let inscribir= (curso)=>{
        
        //variable que contiene la informacion del curso y estudiante a inscribirse
        texto = `El(La) estudiante ${argv.n} con cedula ${argv.c}:\nSe ha prematriculado en el curso llamado\n${curso.nombre} tiene una duración de ${curso.duracion} horas y un valor de ${curso.valor} pesos`

        //Guarda la información en el archivo 'prematricula.txt' 
        fs.writeFile('prematricula.txt',texto, (err)=>{
            if(err) throw (err)
            console.log('se ha creado el archivo')
        })
    }

    //solo entra al if, si el curso existe en la oferta
    if(cur!=null){
        inscribir(cur)
    }
    else{
        //caso contrario muestra un mensaje de alerta
        console.log(`El curso con id ${argv.i} no se encontro en la oferta `)
    }

}
else{
    //esta información solo se muestra si el estudiante solo quiere ver las ofertas de la institución

    //for que se encargara de mostrar los cursos ofertados, en un intervalo de 2 segundos cada curso
    for(var i=0; i<cursos.length;i++)
    {
       var tiempo =2000*i+2000
       imprimir(cursos[i],tiempo)
    }
    
    //funcion que se encarga de mostrar imprimir la información de cada curso
    function imprimir(curso,tiempo)
    {
       
        setTimeout(()=>{
            console.log('=====================================================')
            var {id,nombre,duracion,valor}=curso
            console.log(`Id:${id}\nNombre del curso:${nombre}\nDuración:${duracion}\nValor:${valor}`)
        },tiempo)
    }
}





