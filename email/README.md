# Email Markup Generator

This application is somewhat of a boilerplate for an intranet application that generates HTML to be used in an email. It currently features input for 2 social media links and a file upload that uses the imgur API to upload the image for use in the template.

## Template

When the button is clicked, `template.html` is loaded into the application and the application searches for a few specific template tags to replace with the user data. You can of course use whatever template you want, and continue using the following template tags and/or edit or add your own within the template and [app.js](assets/js/app.js).

| Tag             | Description                          |
| --------------- |:------------------------------------:|
| `{{imgurLink}}` | the literal link to the imgur upload |
| `{{link1}}`     | the first social media link          |
| `{{link2}}`     | the second social media link         |

## Credit

+ [This Imgur Script](https://github.com/pinceladasdaweb/imgur)
+ [jQuery](https://jquery.com/)
+ [Bootstrap](http://getbootstrap.com/)
+ [clipboard.js](https://github.com/zenorocha/clipboard.js)
