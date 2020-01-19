function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++){
      $('#results-list').append(
        `<li><h3><a href="${responseJson[i].url}">${responseJson[i].name}</a></h3>
        </li>`
      )};
    $('#results').removeClass('hidden');
  };
  
  function getRepos(username) {
    const url = 'https://api.github.com/users/' + username + '/repos';
  
    console.log(url);
  
    const options = {
      headers: new Headers({
        "Accept": "application/vnd.github.v3+json"
  })
    };
  
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const username = $('#js-username').val();
      getRepos(username);
    });
  }
  
  $(watchForm);