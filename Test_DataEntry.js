define( [
        './properties',
        './initialproperties',
        'text!./template.html'
    ],
	
    function ( props, initProps, ngTemplate ) {
        'use strict';

        return {
            definition: props,
            initialProperties: initProps,
            snapshot: {canTakeSnapshot: false},
            template: ngTemplate,
            controller: ['$scope', function ( $scope ) {
                $scope.myTitle = 'This is my AngularJS table';
				
				$scope.submit = function () {
	
					alert('dentro SUBMIT!!!');
					
					alert(window.location);
	
					var str = {};			
		
					var fld = 'firstName';
					var ffn = $scope.user.firstName;
					str[fld] = ffn;
			
					fld = 'lastName';
					var fln = $scope.user.lastName;
					str[fld] = fln;

					var jsonTxt = JSON.stringify(str, null, '\t');
					//var result = $.param(jsonTxt);
					
					//jsonTxt = 'firstName=' + ffn + '&lastName=' + fln;
					
					console.log(jsonTxt);
					//console.log(result);
					
					jQuery.support.cors = true;
					
					//$.post('http://localhost:3000/endpoint', jsonTxt);
					
					// ******* se metto $.post l'url diventa http://localhost:4848/sense/[object%20Object] *******
					$.ajax({
						url: "http://localhost:3000/endpoint" + '/jsonp?callback=?',
						type: 'GET',
						data: jsonTxt,
						crossDomain: "true",
						//processData: "false",
						contentType: "application/json; charset=utf-8",
						dataType: "jsonp",
						jsonpCallback: 'callback',
						cache: false,
   						async: false,
						jsonp: 'jsonp',
						
						// Work with the response
   					 	success: function( resp ) {
							console.log('success');                        	
							console.log( resp ); // server response
							console.log(resp.firstName);
							console.log(resp.lastName);
						},
						 error: function (request, status, error) {
        					alert(request.responseText);
							//console.log('Uh Oh!');
    					}
    					/*error: function() {
        					console.log('Uh Oh!');
    					}*/
       					
    				});

		
				};
            }]
        };
    }
	
);