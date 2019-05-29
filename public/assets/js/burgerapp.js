/* eslint-disable no-undef */
$(() => {

  $("#change-devoured-btn").on("click", function(event) {
    event.preventDefault();
    let errText = $("eat-alert");
    let id = $(this).data("burgerid");
    if ($("#user-name").val().trim() === undefined ) {
      errText.removeClass('d-none');
      errText.text("name must not be null and only letters");
    }
    else {
      let ateBurger = {
        burgerId: id,
        user_name: $("#user-name").val().trim()
      }
    $.ajax("/burgers/update", {
      // Send the PUT request.
      type: "PUT",
      data: ateBurger
      
    }).then(() => {
      location.reload(); //Reload the page to get the updated list
    });
    }


  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();// Make sure to preventDefault on a submit event.

    let burger = $("#burger-create").val().trim();

    let letterRe = /[A-z\s]/gi;//RegExp to make sure only letters with burger in the name are allowed to be stored
    let burgerRe = /(?:burger)/i;
    let notWord = /\d|[^a-z\s]/gi

    if (letterRe.test(burger) && !burgerRe.test(burger) && !notWord.test(burger)) {
      $("#valMessage").removeClass("d-none");
      $("#valMessage").html("Burger must be somewhere in the name!");
    } 

    else if (letterRe.test(burger) && burgerRe.test(burger) && !notWord.test(burger)) {

        var newBurger = {
          burger_name: burger
        };

        $.ajax("/burgers/create", {// Send the POST request.
          type: "POST",
          data: newBurger
        }).then(() => {
          location.reload(); //Reload the page to get the updated list
        });
      }
      else {
        $("#valMessage").removeClass("d-none");
        $("#valMessage").html("Valid input format(A-z with spaces must have burger in name)!");
      }
  });

  $("#secretResetButton").on("click", function(event) {
    $.ajax("/burgers/resetall", { // Send the PUT request.
      type: "PUT"
    }).then(() => {
      location.reload(); //Reload the page to get the updated list
    });
  });

  $('#eatBurgerModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var burgerId = button.data('burgerid'); // Extract info from data-* attributes
    var burgerName = button.data('burgername');
    var modal = $(this)
    modal.find('#eatBurgerModalLabel').text('Eat ' + burgerName);
    $("#change-devoured-btn").attr("data-burgerid",burgerId);
  });
});