# Image Gallery

## Specifications

- A user should be able to add images to the gallery via entering the URL of an image on the web into a text field.
- The gallery should display thumbnails of all images.
- When a thumbnail is clicked, that image should display at a large size below the thumbnails.
- There should be buttons by the large image to display the previous and next image, such that the user can scroll through the gallery without clicking the thumbnails every time.
- The previous and next buttons should loop if the user is on the first or last image.
- Should have basic CSS and a few tests.

## Implementation Notes

I used TypeScript for this (setting it up in Create React App was easy); it's what I've used most recently and I like the assurances it gives.

For styling, I opted to use CSS Modules, which comes baked into CRA.

I upgraded some testing dependencies so that implementations, typings, and online documentation were all aligned.

This took a bit under 3 hours of work. If I were to go longer, I might break the Gallery component up a bit, improve the styling (including better mobile responsiveness), and handle the error case where the user inputs a URL which is valid but which doesn't point to an image. (I considered just checking for an extension but there are plenty of valid image URLs that don't end in a file extension, to say nothing of base64-encoded objects).

Happy to discuss the above or anything else that provokes attention.

&mdash;Matt
