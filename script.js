let titulo = ''
if (!localStorage.getItem('titulo')) {
  localStorage.setItem('titulo', titulo);
} else {
  titulo = localStorage.getItem('titulo');
}

let color = '#444444';
if (!localStorage.getItem('fondo')) {
  localStorage.setItem('fondo', color);
} else {
  color = localStorage.getItem('fondo');
}

window.onload = function () {
  document.getElementById('body').style.backgroundColor = localStorage.getItem('fondo');
  document.getElementById('body').style.padding = '0px';
  document.getElementById('title').textContent = localStorage.getItem('titulo');
  document.querySelector('.container').style.padding = localStorage.getItem('padding');
}

document.getElementById('fondo').onchange = function (e) {
  color = e.target.value
  document.getElementById('body').style.backgroundColor = color
  localStorage.setItem('fondo', color);
}

// Cambio Titulo
document.getElementById('icon').onclick = async () => {
  const { value: title } = await Swal.fire({
    title: 'Cambiar Título',
    input: 'text',
    inputPlaceholder: 'Escribe el nuevo título',
    showCancelButton: true,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (value == '') {
        document.getElementById('title').innerHTML = '';
        localStorage.setItem('titulo', '');
      }
    }
  })

  if (title) {
    Swal.fire(`¡Nuevo título: ${title}!`)
    document.getElementById('title').innerHTML = title
    localStorage.setItem('titulo', title);
  }
}

// Logic of game
const maxNumbersPerColumn = 15;

document.addEventListener('DOMContentLoaded', () => {
  const numbersB = document.querySelector('.bingo-board .row:nth-child(1) .numbers');
  const numbersI = document.querySelector('.bingo-board .row:nth-child(2) .numbers');
  const numbersN = document.querySelector('.bingo-board .row:nth-child(3) .numbers');
  const numbersG = document.querySelector('.bingo-board .row:nth-child(4) .numbers');
  const numbersO = document.querySelector('.bingo-board .row:nth-child(5) .numbers');

  createNumbers(numbersB, 1, maxNumbersPerColumn);
  createNumbers(numbersI, maxNumbersPerColumn + 1, maxNumbersPerColumn * 2);
  createNumbers(numbersN, maxNumbersPerColumn * 2 + 1, maxNumbersPerColumn * 3);
  createNumbers(numbersG, maxNumbersPerColumn * 3 + 1, maxNumbersPerColumn * 4);
  createNumbers(numbersO, maxNumbersPerColumn * 4 + 1, maxNumbersPerColumn * 5);
});

function createNumbers(container, start, end) {
  for (let i = start; i <= end; i++) {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = i;
    numberElement.addEventListener('click', () => toggleSelected(numberElement));
    container.appendChild(numberElement);
  }
}

function toggleSelected(element) {
  if (element.parentNode.firstElementChild.innerHTML == 1) {
    element.classList.toggle('selected-b');
  } else if (element.parentNode.firstElementChild.innerHTML == 16) {
    element.classList.toggle('selected-i');
  } else if (element.parentNode.firstElementChild.innerHTML == 31) {
    element.classList.toggle('selected-n');
  }
  else if (element.parentNode.firstElementChild.innerHTML == 46) {
    element.classList.toggle('selected-g');
  }
  else if (element.parentNode.firstElementChild.innerHTML == 61) {
    element.classList.toggle('selected-o');
  }
}

