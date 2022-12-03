posts.forEach(function (post, i) {
    if (i === 0) {
        document.getElementById('posts').innerHTML = "";
    }

    let postHTML = `
    <div class="col-sm-12 com-md-6 col-lg-3 my-2">
        <div class="card">
            <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${post.title.substring(0, 30)}...</h5>
                <p class="card-text">${post.body.substring(0, 50)}...</p>
            </div>
            <div class="card-body text-center">
                <a href="/JsonApp/post.html?id=${post.id}" class="card-link">Read</a>
            </div>
        </div>
    </div>`;

    document.getElementById('posts').innerHTML = document.getElementById('posts').innerHTML + postHTML;
});