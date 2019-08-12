// importing secret file

// Defining a baseURL and key to as part of the request URL

    let baseURL = 'https://newsapi.org/v2/everything?';
    let key = config.NewsAPIKey;
    let sources = ['abc-news','al-jazeera-english','ars-technica', 'bbc-news','cnn','espn','ign','msnbc','national-geographic','nfl-news','politico','techcrunch','the-new-york-times','the-verge','the-washington-post','wired'];
    let pageSize = 6;
    let language = 'en';
// yesterday's date
    let date = new Date();
    let nextDate = date.getDate() - 1;
    date.setDate(nextDate);
    var yesterday = date.toLocaleDateString();

// Grabbing DOM Elements

    let row = document.querySelector('.row');

// Construct URL


     let url = baseURL + 'apiKey=' + key + '&sources=' + sources + '&pageSize=' + pageSize + '&language=' + language + '&from=' + yesterday + '&to=' + yesterday;


// Use fetch() to make the request to the API
     fetch(url).then(function(result) {
      return result.json();
    }).then(function(json) {
        displayResults(json);
    }).catch(err => {
        console.log('An error has occured');
     });

let article;
function displayResults(json) {
        

         article = json.articles;

        if(article.length === 0) {
          var para = document.createElement('p');
          para.textContent = 'No results returned.'
          row.appendChild(para);
        } else {
          for(var i = 0; i < article.length; i++) {
            var row = document.querySelector('.row');
            var col = document.createElement('div');
            col.setAttribute('class','col w-75');
            var card = document.createElement('div');
              card.setAttribute('class','card m-5 w-75');
            var overlay = document.createElement('div');
              overlay.setAttribute('class', 'view overlay');
            var body = document.createElement('div');
              body.setAttribute('class', 'card-body');
            var src = document.createElement('h2');
            var title = document.createElement('h4');
              title.setAttribute('class','card-title');
            var link = document.createElement('a');
            var img = document.createElement('img');
              img.setAttribute('class', 'img-fluid');
            var description = document.createElement('p');
              description.setAttribute('class','card-text');
            var content = document.createElement('p');
            var button = document.createElement('a');
            var clearfix = document.createElement('div');
            var cardFooter = document.createElement('div');
              cardFooter.setAttribute('class','text-center');
            var button = document.createElement('a');
              button.setAttribute('class', 'btn btn-primary');

            var current = article[i];
            //console.log(current);

            link.href = current.url;
            link.textContent = current.title;
            button.href = current.url;
            button.textContent = current.source.name; 
            description.textContent = current.description;
            
            if(current.urlToImage.length > 0) {
              img.src = current.urlToImage;
              img.alt = current.title;
            }

            clearfix.setAttribute('class','clearfix');
            
            row.appendChild(col);
            col.appendChild(card);
            card.appendChild(overlay);
            card.appendChild(cardFooter);
            card.appendChild(button);
            //overlay.appendChild(img);
            card.appendChild(body);
            body.appendChild(link);
            body.appendChild(cardFooter);
            body.appendChild(description);
            //body.appendChild(clearfix);
            //card.appendChild(article);
          }
        }
      };
        