(function($) {

	$( document ).ready(function() {

		var imgurLink;
		var rawTemplateHTML;
		var imgurClientId = 'cc86a8de0e7c459';

		// load the raw template
		$.get( "template.html", function( data ) {
			rawTemplateHTML = data;
		});

		// upload to imgur (imgur.js) see https://github.com/pinceladasdaweb/imgur for usage.
		var feedback = function (res) {
			// if image is uploaded to imgur successfully, assign url our imgurLink variable
			if (res.success === true) {
				imgurLink = res.data.link;
				document.querySelector('.status').classList.add('bg-success');
				document.querySelector('.status').innerHTML = 'Image url: ' + res.data.link;
			}
		};
		new Imgur({
			clientid: imgurClientId,
			callback: feedback
		});

		$('#generate').click(function() {
			var link1 = $('#link1').val();
			var link2 = $('#link2').val();
			var siteURL = $('#siteURL').val();
			var businessName = $('#businessName').val();

			// search for the template tags and replace with our dynamic values
			var templateHTML = rawTemplateHTML.replace(/{{imgurLink}}/g, imgurLink);
					templateHTML = templateHTML.replace(/{{link1}}/g, link1);
					templateHTML = templateHTML.replace(/{{link2}}/g, link2);
					templateHTML = templateHTML.replace(/{{siteURL}}/g, siteURL);
					templateHTML = templateHTML.replace(/{{businessName}}/g, businessName);

			// output to screen
			$('.output').val(templateHTML);
			$('.email-preview').html(templateHTML);
		});

		// Initialize clipboard.js
		var clipboard = new Clipboard('.btn-copy');
	});

})(jQuery);
