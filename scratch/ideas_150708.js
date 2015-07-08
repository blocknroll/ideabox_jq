$(document).ready(function() {
  fetchIdeas();
  bindCreateIdea();
  // bindDeleteEvent();
  // createPost()
});


function fetchIdeas() {
  $.getJSON('/ideas').then(function (ideas) {
    // console.log(ideas);
    var renderedIdeas = ideas.map(renderIdea);
    renderedIdeas.forEach(bindDeleteEvent);  // bind the delete button to each idea.
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



function bindDeleteEvent(idea) {
  $(idea).find('.delete').on('click', function () {   // find button with class 'delete'
    // traverse the DOM back up to the original idea
    var $idea = $(this).parents('.idea');  // 'this' is the the button itself. then look for 'parents' with the class of 'idea', which is the whole idea element. from here we can get the data attribute from the idea.
    // console.log($idea)
    var id = $idea.data('id');  // now we get the id of idea we're deleting

    // send an ajax request...
    // $.ajax('/ideas/' + id, { method: 'delete' }).then(function () {  // pass in the id of the idea we want to delete. and the http method.  after succes, 'then'...
    //   $idea.remove();  // if the server has removed idea from the db, also remove idea from the DOM.
    // })
    // console.log(id)

    $.ajax({
      // url:  "/ideas/" + $idea.attr('data-id'),  // some api's need the '.json' - some don't
      url:  "/ideas/" + id,  // some api's need the '.json' - some don't
      dataType: 'json',
      data: { id: id },
      type: "DELETE",
      // data: ideaParams,      // isolate Params into variable before passing in
      success: function() {  // this is a behavior we're adding, if succesful (append data)
        $idea.remove();
      }
    });

  });
}
