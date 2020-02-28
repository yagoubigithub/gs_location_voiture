export const getCurrentDateTime = () =>{

    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` :d.getMonth() + 1 }-${d.getDate()}T${d.getHours()}:${d.getMinutes()}`
}