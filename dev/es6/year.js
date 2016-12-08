((d)=>{
  const year = d.querySelector('#year'),
        currentYear = new Date().getFullYear();
  year.innerHTML =  currentYear;
})(document);
