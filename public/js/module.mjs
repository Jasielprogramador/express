['ISBN:9781491906187', 'ISBN:9781491920497', 'ISBN:1491910399',
    'ISBN:1491946008', 'ISBN:1491978236', 'ISBN:9781491906187'].
forEach( isbn => {


        fetch(`https://openlibrary.org/api/books?bibkeys=${isbn}&jscmd=details&format=json`).
        then( r => r.json()).
        then( r => {
            console.log (r[isbn].details);
            localStorage.setItem(isbn, JSON.stringify(r[isbn].details))
        });
    }
);

function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}


for (let [key, value] of Object.entries(localStorage).filter( elem => elem[0].startsWith('ISBN'))) {

    let fragment = ` <details> 
            <summary>${key}</summary>  
            <div>${value}</div>
            </details>`;

    document.body.appendChild( parseHTML( fragment ));

}

