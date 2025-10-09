const menuButton = document.querySelector('.menubtn');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('hide');
  menuButton.classList.toggle('change');
});


// const menubtn = document.querySelector('#menubtn');
// const nav = document.querySelector('nav');

// menubtn.addEventListener('click', () => {
//     nav.classList.toggle('hide');   
//     menubtn.classList.toggle('change');
// });

// .menubtn .bar1 {

// }