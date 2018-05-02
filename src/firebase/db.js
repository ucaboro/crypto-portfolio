import { db, auth } from './firebase';


// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');


export const getUserCards = (id) =>
db.ref().child(id);

// add new card
export const addCard = (id, name) => {
const dbRef = db.ref().child(id);
dbRef.push({name: name})
}

//get vals in array
export function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

export const getAllCards = () =>
db.ref().child(auth.currentUser.uid).on('value', function(snapshot) {
    console.log(snapshotToArray(snapshot));
});

//delete specific card based on the id
export const deleteOneCard = (id) => {

  const getAllCards = getUserCards(auth.currentUser.uid)
  const cardToDelete = getAllCards.child(id)
  cardToDelete.remove()
}


// Other Entity APIs ...
