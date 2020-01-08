 # Blog Index
 * Setup the blog app
 * Create the blog model
 * Add index route & template

 # Basic Layout
 * Add header & footer partials
 * Include semantic UI
 * Add simple nav

 # Putting the C in CRUD
 * Add NEW route
 * Add NEW template
 * Add CREATE template
 * Add CREATE template

 # SHOWtime
 * Add SHOW route
 * Add SHOW template
 * Add links to SHOW page
 * Style SHOW templates

 # Edit/Update
 * Add EDIT route
 * Add EDIT form
 * Add UPDATE route
 * Add UPDATE form
 * Add Method-Override (really useful for faking requests other than GET & POST)

 # Destroy
 * Add DESTROY route
 * Add Edit & Destroy Links

 # Final Updates
 * Sanitize blog body (package that removes script tags, prevents            unauthorised js being entered)
 - package name: 'express-sanitizer'
 * Style index
 * Update REST table
 
 # NOTES
 ## RESTFUL ROUTES
 Name       URL                 Verb         Desc.
 ====================================================
 INDEX      /dogs               GET          Display a list of dogs
 NEW        /dogs/new           GET          Display form to make a new dog 
 CREATE     /dogs               POST         Add new dog to DB 
 SHOW       /dogs/:id           GET          Show info about one dog

 ## RESTful Routing
 * What is REST?
 REST - a mapping between HTTP routes & CRUD (CREATE, READ, UPDATE, DESTROY)

 * Why does it matter?
 It is reliable, following a particular pattern.

 * 7 RESTful routes (pattern)
 Name       URL                 Verb         Desc.
 =============================================================================
 INDEX      /dogs               GET          Display a list of dogs
 NEW        /dogs/new           GET          Display form to make a new dog 
 CREATE     /dogs               POST         Add new dog to DB 
 SHOW       /dogs/:id           GET          Show info about one dog      
 EDIT       /dogs/:id/edit      GET          Show edit form for one dog  
 UPDATE     /dogs/:id           PUT          Update specific dog, redirect  
 DESTROY    /dogs/:id           DELETE       Delete specific dog, redirect 

 Name       Mongoose Method
 =============================================================================
 INDEX      Dog.find()
 NEW        N/A
 CREATE     Dog.create()
 SHOW       Dog.findById()
 EDIT       Dog.findById()
 UPDATE     Dog.findByIdAndUpdate()
 DESTROY    Dog.findByIdAndRemove()