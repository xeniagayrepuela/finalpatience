$.ajax({
    		url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {

				if (resp.status  == 'ok') {
					console.log(resp);
				} else
				{
					console.log(resp.message);
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
