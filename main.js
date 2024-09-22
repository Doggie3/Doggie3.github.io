// main.js
function loadSidebar() {
    if(Document.documentElement.scrollWidth>50)
    {
        fetch('/sidebar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('sidebar-container').innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading the sidebar:', error);
            });
    }
}
function loadIndex() {
    fetch('/catalog.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('catalog-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading the catalog:', error);
        });
}
