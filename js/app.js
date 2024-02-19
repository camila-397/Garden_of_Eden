/********************************************* SCROLL *********************************************/
const header = document.querySelector('header');
window.addEventListener('scroll', function()
{
    header.classList.toggle('active', this.window.scrollY > 0)
})

/********************************************* NAV *********************************************/
document.getElementById("bars").addEventListener("click", mostrar_menu);

function mostrar_menu()
{
    document.querySelector("nav").classList.toggle("mostrar_menu");
}

/********************************************* ADD TO CART *********************************************/
$(document).ready(function() {
    var counter = 0; // Contador global

    // Evento click para todos los botones con la clase "cart-button"
    $('.cart-button').on('click', function() 
    {
        var $button = $(this);

        // Cambia el fondo del botón
        $button.css('backgroundColor', '#a0a0a0');
        
        if ($button.text() === 'Add to Cart') 
        {
            // Aumenta el contador si el texto es "Add to Cart"
            counter++;
            $button.text('Remove');
        } 
        else 
        {
            // Disminuye el contador si el texto es "Remove from Cart"
            counter--;
            $button.text('Add to Cart');
            $button.css('backgroundColor', '');
        }

        // Actualiza el contador visible
        $('#counter').text(counter);
    });

});



/********************************************* PAGINATION *********************************************/

// Obtén todos los elementos de tarjeta de libro
var cards = document.querySelectorAll('.card_products');

// Número de tarjetas por página
var cardsPerPage = 6;

// Calcula el número total de páginas
var totalPages = Math.ceil(cards.length / cardsPerPage);

// Página actual
var currentPage = 1;

// Muestra las tarjetas correspondientes a la página actual
function showCards() 
{
    var startIndex = (currentPage - 1) * cardsPerPage;
    var endIndex = startIndex + cardsPerPage;

    for (var i = 0; i < cards.length; i++) 
    {
        if (i >= startIndex && i < endIndex) 
        {
            cards[i].style.display = 'flex';
        } 
        else 
        {
            cards[i].style.display = 'none';
        }
    }

    // Obtiene referencias a los botones Prev y Next
    var prevButton = document.getElementById('prev');
    var nextButton = document.getElementById('next');

    // Cambia el color del botón Prev si estás en la página inicial
    if (currentPage === 1) 
    {
        prevButton.style.backgroundColor = '#a0a0a0';
    } 
    else 
    {
        prevButton.style.backgroundColor = '#008000'; 
    }

    // Cambia el color del botón Next si estás en la última página
    if (currentPage === totalPages) 
    {
        nextButton.style.backgroundColor = '#a0a0a0'; 
    } 
    else 
    {
        nextButton.style.backgroundColor = '#008000'; 
    }

}

// Manejador de evento para el botón Siguiente
document.getElementById('next').addEventListener('click', function() 
{
    if (currentPage < totalPages) {
        currentPage++;
        showCards();
    }
});

// Manejador de evento para el botón Anterior
document.getElementById('prev').addEventListener('click', function() 
{
    if (currentPage > 1) {
        currentPage--;
        showCards();
    }
});

// Mostrar las tarjetas de la primera página al cargar la página
showCards();

/********************************************* SEARCH ENGINE *********************************************/
$(document).ready(function() 
{
    $('#search').on('input', function() 
    {
      var search = $(this).val().toLowerCase(); // Obtener el valor del campo de búsqueda en minúsculas
      $('.card_products').hide(); // Ocultar todos los card

        $('.card_products').filter(function() 
        {
         var plantName = $(this).attr('name-silver').toLowerCase(); // Obtener el nombre de la planta en minúsculas

            if (plantName.includes(search)) 
            {
                $(this).show();
            }
            else 
            {
                $(this).hide();
            }
        });

        if (search === '') 
        {
            currentPage = 1;
            showCards();
            return;
        }
    });
});


/********************************************* FORM VALIDATION *********************************************/

document.getElementById('contactForm').addEventListener('submit', function(event) 
{
    var fullName = document.getElementsByName('full_name')[0].value;
    var email = document.getElementsByName('e-mail')[0].value;
    var message = document.getElementsByName('txt')[0].value;
    var isValid = true;

    var box_message = document.querySelector('.message');
    var accept = document.getElementById('accept');

    // Validación de campos
    if (fullName === '') 
    {
        isValid = false;
        showError('full-name-error');
    } 
    else 
    {
        hideError('full-name-error');
    }

    if (email === '') 
    {
        isValid = false;
        showError('email-error');
    } 
    else 
    {
        hideError('email-error');
    }

    if (message === '') 
    {
        isValid = false;
        showError('message-error');
    } 
    else 
    {
        hideError('message-error');
    }

    if (!isValid)
    {
        event.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
    } 
    else 
    {
        box_message.style.display = 'grid'; // Mostrar el mensaje de éxito
        event.preventDefault(); 

        accept.onclick = () =>
        {
            box_message.style.display = 'none';
            location.reload();
        }
    }
});

function showError(errorId) 
{
    document.getElementById(errorId).style.display = 'inline'; // Muestra el mensaje de error
}

function hideError(errorId) 
{
    document.getElementById(errorId).style.display = 'none'; // Oculta el mensaje de error
}
