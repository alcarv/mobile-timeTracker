export const createCalendarArray = (inicio, fim, duracao) => {
    const arrLength = ((fim - inicio) * 60) / duracao;
    const arr = [];

    for (let index = 0; index < arrLength; index++) {
        let x = {};
        x._id = ''+index;

        arr.push(x)
    }

    return arr
}