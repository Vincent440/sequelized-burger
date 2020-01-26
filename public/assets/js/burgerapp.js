/* eslint-disable no-undef */
$(() => {
// RegEx used for creating burger, and User
  const letterReg = /[A-z\s]/gi// Checks that it contains letters with spaces
  const notWord = /\d|[^a-z\s]/gi// checks if it contains digits or anything that is not a letter

  $('#change-devoured-btn').on('click', function (event) {
    event.preventDefault()

    const user = $('#user-name').val().trim()
    const errText = $('#eat-alert')
    const id = $(this).data('burgerid')

    if (!letterReg.test(user) || notWord.test(user)) {
      errText.removeClass('d-none')
      errText.html("Name can't be left blank & Must only contain letters.")
    } else if (letterReg.test(user) && !notWord.test(user)) {
      const ateBurger = {
        burgerId: id,
        user_name: user
      }
      $.ajax('/burgers/update', {
        type: 'PUT',
        data: ateBurger
      }).then(() => {
        location.reload() // Reload the page to update
      })
    } else {
      errText.removeClass('d-none')
      errText.html("Name must contain letters only, and Can't be left blank.")
    }
  })

  $('.create-form').on('submit', function (event) {
    event.preventDefault()// Make sure to preventDefault on a submit event.

    const burger = $('#burger-create').val().trim()
    // RegExp to make sure only letters with burger in the name are allowed to be stored
    const burgerRe = /(?:burger)/i

    if (letterReg.test(burger) && !burgerRe.test(burger) && !notWord.test(burger)) {
      $('#valMessage').removeClass('d-none')
      $('#valMessage').html('Burger must be somewhere in the name!')
    } else if (letterReg.test(burger) && burgerRe.test(burger) && !notWord.test(burger)) {
      var newBurger = {
        burger_name: burger
      }
      $.ajax('/burgers/create', { // Send the POST request.
        type: 'POST',
        data: newBurger
      }).then(() => {
        location.reload() // Reload the page to get the updated list
      })
    } else {
      $('#valMessage').removeClass('d-none')
      $('#valMessage').html('Valid input format(A-z with spaces must have burger in name)!')
    }
  })

  $('#secretResetButton').on('click', function (event) {
    $.ajax('/burgers/resetall', { // Send the PUT request.
      type: 'PUT'
    }).then(() => {
      location.reload() // Reload the page to get the updated list
    })
  })

  $('#eatBurgerModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var burgerId = button.data('burgerid') // Extract info from data-* attributes
    var burgerName = button.data('burgername')
    var modal = $(this)
    modal.find('#eatBurgerModalLabel').text('Eat ' + burgerName)
    $('#change-devoured-btn').attr('data-burgerid', burgerId)
  })
})
