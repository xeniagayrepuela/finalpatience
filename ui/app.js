function rowtask(description, done, id, title)
{
   return '<div class="col-lg-12">' +
          '<h4>' + id + "&nbsp;&nbsp;" + title + '</h4>' +
          '<p>'+description+' </br> Status: '+done+'</p> </div>'; 
}

function loadtasks()
{

$.ajax({
    		url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#tasks").html("");
				if (resp.status  == 'ok') {
				   for (i = 0; i < resp.count; i++)
                                  {
                                       description = resp.entries[i].description;
                                       done = resp.entries[i].done;
                                       id = resp.entries[i].id;
                                       title = resp.entries[i].title;
                                       $("#tasks").append(rowtask(description, done, id, title));
                                       
	                          }
				} else
				{
                                       $("#tasks").html("");
					alert(resp.message);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},
                beforeSend: function (xhrObj){
          		xhrObj.setRequestHeader("Authorization",
                        "Basic " + btoa("ako:akolagini"));
   			}
		}); 
}
