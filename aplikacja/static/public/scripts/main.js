document.addEventListener('DOMContentLoaded', (event) => {
    fetchTailes(`/data/tiles.json`,function(err, data){
        buildHTML(data);
    });
  });

  function buildHTML(data){
    console.log(data);
    var ul = document.querySelector('.tiles');
    data.forEach(function(element){
        var li = document.createElement('li');
        var link = document.createElement('a');
        console.log(element.link);
        link.href = element.link;
        var name = document.createElement('h1');
        name.innerHTML = element.name;
        var img = new Image();
        img.src = imageUrlForRestaurant(element);
        img.onload = function(){
            link.appendChild(name);
            li.appendChild(link);
            li.appendChild(img);
        }
        ul.appendChild(li);
    });
}