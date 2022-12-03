var id = document.location.search.split('=')[1];
var post = posts.filter(function(post){
    return post.id == id;
})

var src = (post[0].poster)? post[0].poster: 'https://www.freeiconspng.com/uploads/no-image-icon-13.png'
document.getElementById('poster').setAttribute('src', src);
document.getElementById('title').innerHTML = post[0].title;
document.getElementById('content').innerHTML = post[0].body;

id = parseInt(id);

document.getElementById('btnNext').setAttribute('href', `/JsonApp/post.html?id=${id + 1}`);

if(id == 1){
    document.getElementById('btnPrevious').setAttribute('href', `/JsonApp/post.html?id=${id}`);
    document.getElementById('btnPrevious').setAttribute('disabled', 'disabled')
    document.getElementById('btnPrevious').setAttribute('class', 'btn btn-primary disabled')
}else{
    document.getElementById('btnPrevious').setAttribute('href', `/JsonApp/post.html?id=${id - 1}`)
}
