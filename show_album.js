$(function () { 
    var url = window.location.href;
    var id = url.split('=');
    show(id[1]);
    $('.add_ablum').click(function(){

        title = $('#title').val();
        val = {userId : id[1],title : title};
        $.ajax({
            method : 'POST',
            url: "https://jsonplaceholder.typicode.com/albums?userId="+id[1],
            data: val,
            success: function (response) {
                $('#title').val('');
                $('#t_body').append("<tr><td>"+response.id+"</td><td>"+response.title+"</td><td><button data-id="+response.id+" class='btn btn-primary update')'>Update</button></td><td><button data-id="+response.id+" class='btn btn-primary del' onclick='del("+response.id+")'>Delete</button></td></tr>");
            }
        });
    });
});
function show(id) { 
    $.ajax({
        method : "GET",
        url : 'https://jsonplaceholder.typicode.com/albums?userId='+id,
        success : function (response){
            response.forEach(function(val){
                $('#t_body').append("<tr><td>"+val.id+"</td><td>"+val.title+"</td><td><button data-id="+val.id+" class='btn btn-primary update')'>Update</button></td><td><button data-id="+val.id+" class='btn btn-primary del' onclick='del("+val.id+")'>Delete</button></td></tr>");
            });
            $('.update').click(function(){
                temp = $(this).parent().parent().children(); 
                td = temp[1];
                {
                    var title = prompt("Enter New Title",td.innerText);
                    if(title == null || title == '')
                    {
                        alert('Cannot enter empty value');
                    }else if (title != null) {
                        td.innerText = title;
                    }
                }
            });
        }
    });
}
function del (id){
    $.ajax({
        method : 'DELETE',
        url : "https://jsonplaceholder.typicode.com/albums/"+id,
        success : function(){ 
            alert('Deleted album '+id);
            temp = "[data-id="+id+"]";
            $(temp).parent().parent().hide();
    }
    });
}