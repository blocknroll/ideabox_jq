$(document).ready(function() {
  fetchIdeas()
  // createPost()
})


function fetchIdeas() {
  $.ajax({
    type: 'GET',
    url:  '/',     // or /index.json ???
    success: function(ideas) {
      $.each(ideas, function(index, idea) {
        var newestIdeaID = parseInt($('.idea').last().attr('data-id'))  // parseInt is like .to_i in Ruby

        // if there are no ideas, OR if idea is newer than ideas we already have, THEN render ideas
        if (isNan(newestIdeaID) || idea.id > newestIdeaID) {
          renderIdea(idea)
        }
      })
    }
  })
}


function renderIdea(idea) {
  $("#ideas-list").append(
  "<div class='idea' data-id=" +
  idea.id +
  "><h6>Title: " +
  idea.title +
  "</h6><p>" +
  idea.body +
  "</p></div>"
  )
}
