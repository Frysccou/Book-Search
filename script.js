document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
      searchBooks(query);
      hideSearchBar();
    }
  });
  
  document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      const query = document.getElementById('search-input').value;
      if (query) {
        searchBooks(query);
        hideSearchBar();
      }
    }
  });
  
  function hideSearchBar() {
    const searchBar = document.querySelector('.search-bar');
    searchBar.style.opacity = '0';
    searchBar.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      searchBar.style.display = 'none';
      document.querySelector('.grid-container').classList.add('visible');
    }, 500);
  }
  
  function searchBooks(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayResults(data.items);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (!books) {
      resultsDiv.innerHTML = '<p>No se encontraron resultados</p>';
      return;
    }
  
    books.forEach(book => {
      const bookInfo = book.volumeInfo;
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
  
      const bookImg = document.createElement('img');
      bookImg.src = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/100';
      bookDiv.appendChild(bookImg);
  
      const bookTitle = document.createElement('p');
      bookTitle.classList.add('book-title');
      bookTitle.textContent = bookInfo.title;
      bookDiv.appendChild(bookTitle);
  
      const bookAuthor = document.createElement('p');
      bookAuthor.classList.add('book-author');
      bookAuthor.textContent = bookInfo.authors ? bookInfo.authors.join(', ') : 'Autor desconocido';
      bookDiv.appendChild(bookAuthor);
  
      const bookInfoLink = document.createElement('a');
      bookInfoLink.href = bookInfo.infoLink;
      bookInfoLink.target = '_blank';
      bookInfoLink.textContent = 'Más información';
      bookDiv.appendChild(bookInfoLink);
  
      resultsDiv.appendChild(bookDiv);
    });
  
    document.querySelector('.grid-container').classList.add('visible');
  }  