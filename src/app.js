async function secretSanta () {

  // Get the manually selected sticky notes.
  const stickyNotes = await miro.board.getSelection();
  console.log( stickyNotes );

  // Create an empty collection of participants.
  const participants = buildCollection( stickyNotes );
  console.log( participants );

  // As long as there are at least 2 participants:
  const numRemainingParticipants = Object.keys( participants ).length;
  while ( numRemainingParticipants > 1 ) {

    // Pick a participant.
    const participantId1 = pickAndRemoveParticipant( participants );

    // Pick another participant.
    const participantId2 = pickAndRemoveParticipant( participants );

    // Create a connection between the 2 participants.
    await createConnection( participantId1, participantId2 );
    console.log( participants )

    numRemainingParticipants = Object.keys( participants ).length;
  };
};

function buildCollection(stickyNotes) {
  // Set the collection as an empty object.
  let collection = {};
  // { '123', 'Marco', '456', 'John', '789', 'Mary' }
  // Add participant IDs to the collection.
  stickyNotes.forEach( stickyNote => {
    collection[ stickyNote.id ] = stickyNote.content;
  } );
  return collection;
};

// TODO: use splice to pick and remove participants IDs
// create list of colors and connector terminals and randomize them.
// create dedicated function to randomize getting the value of an index in an array.
function pickAndRemoveParticipant ( participants ) {
  // Get array of participant IDs.
  const ids = Object.keys( participants );
  console.log( ids );
  // Generate a random number between 0 and the number of participants.
  const randomIndex = Math.floor( Math.random() * ids.length );
  console.log( randomIndex );

  // Assign the random number to an index in the participants array.
  // This selects a participant at random.
  const randomId = ids[randomIndex];
  console.log( randomId );

  // Delete the randomly selected participant from the participants array.
  delete participants[ randomId ];
  console.log( participants );
  
  return randomId
}

// Create a connector line between 2 selected participants.
async function createConnection ( id1, id2 ) {
  await miro.board.createConnector( {

    // Start at participant 1.
    start: { item: id1 },

    // End at participant 2.
    end: { item: id2 },
  } );
};

secretSanta();
