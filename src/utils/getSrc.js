const getSrcStartIcon = (name) => {
    if (typeof name === 'undefined') return 'error.png'
    const path = `/src/assets/img/icon/startIcon/${name}`;
    const modules = import.meta.globEager(`/src/assets/img/icon/startIcon/*`);
    return modules[path]?.default;
}

export {
    getSrcStartIcon
}