$(document).ready(function() {
  fetchIdeas();
  bindCreateIdea();
  // createPost()
});


function fetchIdeas() {
  $.getJSON('/ideas').then(function (ideas) {
    // console.log(ideas);
    var renderedIdeas = ideas.map(renderIdea);
    $('#ideas').html(renderedIdeas);
  });
}


function renderIdea(idea, id) {
  return $('<div class="idea" data-id="' + id + '">' +
    '<h2>' + idea.title + '</h2>' +
    '<p>' + idea.body + '</p>' +
    '<div class="buttons">' +
      '<button class="edit">Edit</button>' +
      '<button class="delete">Delete</button>' +
    '</div>' +
  '</div>');
}


function bindCreateIdea() {
  var $form = $('.new-idea-form');
  var $title = $form.find('.new-idea-title');
  var $body = $form.find('.new-idea-body');
  var $submit = $form.find('input[type="submit"]');

  $submit.on('click', function (event) {
    // console.log("worky?")  // use this to prove event is working
    event.preventDefault();

    // TRY $.ajax style instead
    // double-check ideaParams
    var ideaParams = { idea: { title: $title.val(), body: $body.val() } }
    // var ideaParams = { idea: { title: $("#idea-title").val(), body: $("#idea-body").val() } }
    // console.log(ideaParams)
    $.ajax({
      type: "POST",
      url:  "/ideas",        // some api's need the '.json' - some don't
      data: ideaParams,      // isolate Params into variable before passing in
      success: function(newIdea) {  // this is a behavior we're adding, if succesful (append data)
        appendIdea(newIdea)
      }
    });

    // $.post('/ideas', {
    //   title: $title.val(),
    //   body: $body.val()
    // }).then(appendIdea);
  });
}


function appendIdea(data) {
  var ideaMarkup = renderIdea(data);
  $(ideaMarkup).appendTo('#ideas');
}
