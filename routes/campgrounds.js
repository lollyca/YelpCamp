const { isLoggedIn, isAuthor, validatedCampground } = require('../middleware');
const cathcAsync = require('../utils/cathAsync');
const campgrounds = require('../controllers/campgrounds');
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/')
    .get(cathcAsync(campgrounds.index))
    // .post(isLoggedIn, validatedCampground, cathcAsync(campgrounds.createCampground))
    .post(upload.single('image'), (req,res) => {
        console.log(req.body, req.file);
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(cathcAsync(campgrounds.showCampground))
    .put(isLoggedIn, validatedCampground, cathcAsync(campgrounds.updateCampground)) //#update
    .delete(isLoggedIn, cathcAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, cathcAsync(campgrounds.renderEditForm));

module.exports = router;


/*Learning:
We use async functions when we need to look up our database first to continue doing things

#update  ---  After seting up the route for edit we need to ACTUALLY update the thing, thats why we have #update right bellow

#2:
without parse.body we can't see a thing =P
Ok, after looking what req.body was, lets create a new Camground and save
if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
*/

