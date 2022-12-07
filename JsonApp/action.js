var qs = window.location.search;
if (qs != '') {
    qs = qs.replace("?", "");
}
qs = qs.split("&")
var filters = {};
qs.forEach(function (v) {
    v = v.split("=");
    filters[v[0]] = (v[0] == 'p' || v[0] == 'i') ? parseInt(v[1]) : v[1]
});

if(filters.p === undefined){
    filters.p=1;
}
if(filters.i === undefined){
    filters.i=6;
}

var itemsPerPage = filters.i;
var pages = Math.ceil(posts.length / itemsPerPage);

if (filters.p > pages) {
    filters.p = pages;
} else if (filters.p < 1) {
    filters.p = 1;
}

var pageStartIndex = (parseInt(filters.p) - 1) * itemsPerPage;
var lastItemIndex = pageStartIndex + itemsPerPage;

var pagesHTML = '';
// for (let i = 1; i <= pages; i++) {
for (let i = (((filters.p - 2) < 1) ? 1 : (pages <=5)? 1 : filters.p - 2); i <= ((filters.p + 2 < 5) ? 5 : (filters.p + 2 > pages) ? pages : filters.p + 2); i++) {
    pagesHTML += '<li class="page-item ' + ((filters.p) == i ? 'active' : '') + '"><a class="page-link" href="/JsonApp/index.html?p=' + i + '&i='+ filters.i+'">' + i + '</a></li>'
}

if ((filters.p + 2) < pages && (pages >5)) {
    pagesHTML += '<li class="page-item"><a class="page-link disabled" >...</a></li>'
}
if ((filters.p - 2) > 1 && (pages >5 && filters.p >3)) {
    pagesHTML = '<li class="page-item"><a class="page-link disabled" >...</a></li>' + pagesHTML
}
var paginatin = `<nav aria-label="Page navigation example">
<ul class="pagination justify-content-center">
    <li class="page-item ${((filters.p) == 1 ? 'disabled' : '')}">
        <a class="page-link" href="/JsonApp/index.html?p=${(parseInt(filters.p) - 1)}&i=${filters.i}">Previous</a>
    </li>
    ${pagesHTML}
    <li class="page-item ${((filters.p) == pages ? 'disabled' : '')}">
        <a class="page-link" href="/JsonApp/index.html?p=${(parseInt(filters.p) + 1)}&i=${filters.i}">Next</a>
    </li>
</ul>
</nav>`

document.getElementById('pagenation').innerHTML = paginatin;


/* 
    1 => 0-5
    2 => 6-11
    3 => 12 - 17
    ..
    n => (n-1)*itemsPerPage <-> (n-1)*itemsPerPage + itemsPerPage
 */

for (let i = pageStartIndex; i < lastItemIndex; i++) {
    if (i === pageStartIndex) {
        document.getElementById('posts').innerHTML = "";
    }
    let post = posts[i];
    if (post === undefined) {
        break;
    }
    let postHTML = `
    <div class="col-sm-12 com-md-6 col-lg-2 my-2">
        <div class="card">
            <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${(post.title !== undefined) ? post.title.substring(0, 15) : ''}...</h5>
                <p class="card-text">${post.body.substring(0, 30)}...</p>
            </div>
            <div class="card-body text-center">
                <a href="/JsonApp/post.html?id=${post.id}" class="card-link">Read</a>
            </div>
        </div>
    </div>`;

    document.getElementById('posts').innerHTML = document.getElementById('posts').innerHTML + postHTML;
}

setTimeout(function () {
    document.getElementById('ipp').value = filters.i;
}, 1000)

function changeIpp(e) {
    itemsPerPage = parseInt(e.target.value);
    if (e.target.value != filters.i) {
        var url = window.location.href.split('?')[0];
        url += "?p=" + filters.p + "&i=" + itemsPerPage
        window.location.replace(url);
    }
}
// posts.forEach(function (post, i) {
//     if (i === 0) {
//         document.getElementById('posts').innerHTML = "";
//     }

//     let postHTML = `
//     <div class="col-sm-12 com-md-6 col-lg-2 my-2">
//         <div class="card">
//             <img src="https://www.freeiconspng.com/uploads/no-image-icon-13.png" class="card-img-top">
//             <div class="card-body">
//                 <h5 class="card-title">${post.title.substring(0, 30)}...</h5>
//                 <p class="card-text">${post.body.substring(0, 50)}...</p>
//             </div>
//             <div class="card-body text-center">
//                 <a href="/JsonApp/post.html?id=${post.id}" class="card-link">Read</a>
//             </div>
//         </div>
//     </div>`;

//     document.getElementById('posts').innerHTML = document.getElementById('posts').innerHTML + postHTML;
// });