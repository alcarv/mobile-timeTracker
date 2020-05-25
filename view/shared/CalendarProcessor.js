export const createCalendarArray = (inicio, fim, duracao, horariosDoDia) => {
    const arrLength = ((fim - inicio) * 60) / duracao;
    const arr = [];

    let inicioEmMinutos= inicio * 60;
    const fimEmMinutos = fim * 60;

    for (let index = 0; index < arrLength; index++) {
        let x = {};
        x._id = ''+index;

        x.inicio = inicioEmMinutos;
        inicioEmMinutos = inicioEmMinutos + +duracao;
        x.fim = inicioEmMinutos;

        let inicioFull = (x.inicio / 60) + '';
        let fimFull = (x.fim / 60) + '';

        if(inicioFull.includes('.')){
            let arrInicio = inicioFull.split('.');
            x.inicioHora = arrInicio[0]
            x.inicioMinuto = Math.round()
            x.inicioMinuto = Math.ceil(+((((arrInicio[1] * 6) + '').substring(0, 2))) / 5) * 5
        }else{
            x.inicioHora = +inicioFull
            x.inicioMinuto = '00'
        }

        if(fimFull.includes('.')){
            let arrFim = fimFull.split('.');
            x.fimHora = arrFim[0]
            x.fimMinuto = Math.ceil(+((((arrFim[1] * 6) + '').substring(0, 2))) / 5) * 5
        }else{
            x.fimHora = +fimFull
            x.fimMinuto = '00'
        }

        x.reservado = false;

        horariosDoDia.forEach(horarioDoDia => {
            if(((x.inicioHora == horarioDoDia.horario.split(':')[0]) && (x.inicioMinuto == horarioDoDia.horario.split(':')[1]))){
                x.reservado = true;
            }
        });

        arr.push(x)
    }

    return arr
}