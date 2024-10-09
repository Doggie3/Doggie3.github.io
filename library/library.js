function test_add_cookie(cname, value) {
    document.cookie = cname + "=" + value;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function refresh() {
    $.getJSON("items.json", function(data){
        show_items(data);
    });
}

function show_items(data){
    document.getElementById("library-list-menu").innerHTML=""
    $.each(data, function(infoIndex, info) {
        var strHtml = "<a href='./"+info["model"]+"'>";
        strHtml += "<h3>" + info["name"] + "</h3>";
        strHtml += "<img src='" + info["img"] + "' alt='a picture of "+info["name"]+"'></img>";
        strHtml += "<p>"+info["describe"]+"</p>";
        document.getElementById("library-list-menu").innerHTML += "<div class='card'>"+strHtml+"</div></a>";
    })
}