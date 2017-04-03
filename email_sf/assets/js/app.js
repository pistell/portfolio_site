(function($) {

	$( document ).ready(function() {
		//Disables the Generate HTML button until an image is chosen
    $('input:file').change(
		    function() {
		        if ($(this).val()) {
		            $('#generate').attr('disabled',false);
		        }
	    	});

		//I honestly don't remember what these are for but they work
		var imgurLink;
		var rawTemplateHTML;

		// load the raw template
		$.get( "template.html", function( data ) {
			rawTemplateHTML = data;
		});

		$('#generate').click(function() {
			//Show a loading modal on generate
			$.loadingBlockShow();

			var link1 			 = $('#link1').val();
			var link2 			 = $('#link2').val();
			var yelpLink 		 = $('#yelpLink').val();
			var siteURL 		 = $('#siteURL').val();
			var businessName = $('#businessName').val();
			var teamSig 		 = $("#teamSig").val();

			// search for the template tags and replace with our dynamic values
			var templateHTML = rawTemplateHTML.replace(/{{imgurLink}}/g, imgurLink);
					templateHTML = templateHTML.replace(/{{link1}}/g, link1);
					templateHTML = templateHTML.replace(/{{link2}}/g, link2);
					templateHTML = templateHTML.replace(/{{yelpLink}}/g, yelpLink);
					templateHTML = templateHTML.replace(/{{siteURL}}/g, siteURL);
					templateHTML = templateHTML.replace(/{{businessName}}/g, businessName);
					templateHTML = templateHTML.replace(/{{teamSig}}/g, teamSig);

			// output preview to screen
			$('.output').val(templateHTML);
			$('.email-preview').html(templateHTML);

			//Creating the canvas element
    	var canvas  = document.getElementById("canvas");
    	var ctx = canvas.getContext("2d");
    	//Create the canvas with white borders and red center with a linear gradient
    	//Had to add white borders because the Imgur API would color transparent space black
    	var grad = ctx.createLinearGradient(100,130,100,0);
    	//White bottom
    	grad.addColorStop(0, 'rgba(255,255,255,1)');
    	grad.addColorStop(0.15, 'rgba(255,255,255,1)');
    	//Black to red gradient middle
    	grad.addColorStop(0.15, '#B7281C');
    	grad.addColorStop(0.85, '#B7281C');
    	//White top
    	grad.addColorStop(0.85, 'rgba(255,255,255,1)');
    	grad.addColorStop(1, 'rgba(255,255,255,1)');
    	ctx.fillStyle = grad;
    	//Create a 490x130 rectangle
    	ctx.fillRect(0, 0, 490, 130);

      //Begin displaying Agent information
    	ctx.font = "20px Helvetica";
    	ctx.fillStyle = "white";
    	var agentName = businessName,
    	textWidth = ctx.measureText(agentName).width;
    	//Tries its best to center the name on the canvas
    	ctx.fillText(agentName, (canvas.width / 2) - (textWidth / 2), 50);
    	ctx.font = "12px Helvetica";
    	ctx.fillText("State Farm Insurance Agent", 170, 68);
    	ctx.font = "20px Helvetica";
    	//ctx.fillText("281-330-8004", 290, 160);
    	ctx.fillText(siteURL, 178, 90);
    	//The state farm logo
			var imageObj = new Image();
	  		imageObj.onload = function() {
	    		ctx.drawImage(imageObj, 385, 40, 90, 55);
	  	};
	  	imageObj.src = 'state-farm_white_logo-2.png';

			//The Agent's Photo
			var agentMug = new Image();
			var f = document.getElementById("fileUpload").files[0];
			var u = window.URL || window.webkitURL;
			src = u.createObjectURL(f);
			agentMug.src = src;
			agentMug.onload = function(){
			    ctx.drawImage(agentMug, 20, 0, 114, 150);
			    u.revokeObjectURL(src);
			}

			//Upload the canvas to Imgur to turn it into an image
			html2canvas(document.body).then(function(canvas){
				try {
				    var img = document.getElementById('canvas').toDataURL('image/jpeg', 1.0).split(',')[1];
				} catch(e) {
				    var img = document.getElementById('canvas').toDataURL('image/jpeg', 1.0).split(',')[1];
				}

			$.ajax({
			    url: 'https://api.imgur.com/3/image',
			    type: 'post',
			    album: 'yY1Ch',
			    headers: {
			        Authorization: 'Client-ID 36a0fbdd41b053d'
			    },
			    data: {
			        image: img
			    },
			    dataType: 'json',
			    success: function(response) {
			        if(response.success) {
			            console.log('The canvas is uploading...');
			            console.log(response.data.link);
			            //Get rid of the canvas and replace it with an img
			            $("#canvas").remove();
			            var html = '<a href="tel:1-' + siteURL + '"><img src="' + response.data.link + '"></a>';
			            $(".heroImageConverted").append(html);
			            //Remove the loading modal
			            $.loadingBlockHide();
			        }
			    }
			});
	  });
 });
// Initialize clipboard.js
var clipboard = new Clipboard('.btn-copy');
});
})(jQuery);
