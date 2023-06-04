console.log("client.js sourced");

$(document).ready(onReady);

function onReady() {
  console.log("DOM ready");

  $("#addJokeButton").on("click", handleAddJoke);

  renderJokesToDOM();

  // - Send requests to the server from client using an AJAX request(s),
  // - Display response on the DOM,
  // - Demonstrate the separation of logic between the client and the server.

  // * when the app is loaded, all jokes should be displayed on the DOM below the inputs
  // * the user should be able to add jokes using the input form
  // * after a joke is added, the jokes displayed on the DOM should reflect the new data
} //END

function handleAddJoke() {
  whoseJokeIn = $("#whoseJokeIn").val();
  questionIn = $("#questionIn").val();
  punchlineIn = $("#punchlineIn").val();

  // SEND INPUTS TO SERVER AS OBJECTS
  $.ajax({
    method: "POST",
    data: {
      whoseJoke: whoseJokeIn,
      jokeQuestion: questionIn,
      punchLine: punchlineIn,
    },
    url: "/joke",
  })
    .then(function (response) {
      // function goes here to update DOM
      console.log("it is working");

      renderJokesToDOM();
    })
    .catch(function (error) {
      alert("not working", error);
    });
}

// RECEIVE OBJECTS FROM SERVER AND DISPLAY TO DOM
function renderJokesToDOM() {
  $.ajax({
    method: "GET",
    url: "/joke",
  })
    .then(function (response) {
      let jokes = response;

      $("#outputDiv").empty();

      for (let joke of jokes) {
        $("#outputDiv").append(`
      <li>
              ${joke.whoseJoke}
        <div> ${joke.jokeQuestion} </div>
        <div> ${joke.punchLine} </div>
        <div>---------</div>
      </li>
      `);
      }
    })
    .catch(function (error) {
      console.log("nope", error);
    });
}
