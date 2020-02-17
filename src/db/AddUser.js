import PouchDB from 'pouchdb';
function AddUser (userName) {
    let db = new PouchDB('todos');
    console.log("Local database created");


    let addRecord = {
        _id: new Date().toISOString(),
        title: userName,
        completed: false
    };

        db.put(addRecord, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a todo!');
            }
        });


// Création de l'object base de données distante
var remoteDb = new PouchDB(
    "http://127.0.0.1:5984/notes"
  );
  console.log("Remote database created");


  // Initialisation de la réplication
var sync = db.sync(remoteDb, {
    live: true,
    retry: true
});


sync.on("change", function(info) {
    // La réplication a créé ou modifié un document
    console.log("On change");
    console.log(info);
  }).on("complete", function(info) {
    // La réplication a été terminée ou annulée
    console.log("On complete");
    console.log(info);
  }).on("paused", function(error) {
    // La réplication est en pause (la base de données est à jour ou l'utilisateur est offline)
    console.log("On paused");
    console.log(error);
  }).on("active", function() {
    // La réplication reprend (nouvelles modifications de réplication ou l'utilisateur est de retour online)
    console.log("On active");
    console.log("active");
  }).on("denied", function(error) {
    // Un document n'a pas réussi à se répliquer
    console.log("On denied");
    console.log(error);
  }).on("error", function(error) {
    // La réplication s'est arrêtée en raison d'une erreur irrécupérable
    console.log("On error");
    console.log(error);
  })



    }
export default AddUser;