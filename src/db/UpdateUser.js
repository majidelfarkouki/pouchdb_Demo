import PouchDB from 'pouchdb';
function UpdateUser(user) {
    let db = new PouchDB('todos');
    db.put(user);


var remoteDb = new PouchDB(
    "http://127.0.0.1:5984/notes"
  );
  console.log("Remote database created");


  // Initialisation de la réplication
var sync = db.sync(remoteDb, {
    live: true,
    retry: true
});
}
export default UpdateUser;