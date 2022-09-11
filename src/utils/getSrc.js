const getSrcStartIcon = (name) => {
    if (typeof name === 'undefined') return 'error.png'
    const path = `/src/assets/img/icon/startIcon/${name}`;
    const modules = import.meta.globEager(`/src/assets/img/icon/startIcon/*`);
    return modules[path]?.default;
}

const getSrcIconUI = (name) => {
    if (typeof name === 'undefined') return 'error.png';
    const path = `/src/assets/img/icon/ui/${name}`;
    const modules = import.meta.globEager(`/src/assets/img/icon/ui/*`);
    return modules[path]?.default;
  };
  
const getSrcIcon = (name) => {
  if (typeof name === 'undefined') return 'error.png';
  const path = `/src/assets/img/icon/${name}`;
  const modules = import.meta.globEager(`/src/assets/img/icon/*`);
  return modules[path]?.default;
};

export {
    getSrcStartIcon,
    getSrcIcon,
    getSrcIconUI
}