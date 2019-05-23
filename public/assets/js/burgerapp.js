$(() => {

  $(".change-devoured").on("click", function(event) {
    //let customer = $("#customer-create").val().trim();
    event.preventDefault();
    var id = $(this).data("burgerId");
    $.ajax("/burgers/update", {
      // Send the PUT request.
      type: "PUT",
      data: {
        id
      }
    }).then(() => {
      location.reload(); //Reload the page to get the updated list
    });
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
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('Eat ' + burgerName);
    modal.find('.modal-footer button').data("burgerid"+burgerId);
  });
});