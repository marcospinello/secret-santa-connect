async function secretSanta () {
console.log( "Secret Santa" );
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

    // Update the number of remaining participants.
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

  // Return the randomly selected ID of the participant.
  return randomId;
}

// Enter names of participants.
async function participantNames () {

  // Prompt user to enter names of participants.
  let names = prompt( "What are the names of your friends? Enter a name for each participant.", "Names must be comma-separated." );
  console.log( names );

  alert( "Great! Click \"Create sticky notes\" to proceed." );
    
  // Create an array of names.
  const nameList = names.split( "," );
  console.log( nameList );

  // Trim whitespace from each name.
  const trimmedNameList = nameList.map( name => name.trim() );

  // Create a sticky note for each participant.
  const stickies = []
  for ( let i = 0; i < trimmedNameList.length; i++ ) {
    const randomFillColor = getRandomElementInArray( stickyNoteFillColor );
    const sticky = await createSticky( trimmedNameList[ i ], randomFillColor );
    stickies.push(sticky)
  }

  await miro.board.viewport.zoomTo(stickies)
};

const stickyNoteFillColor = [
  'gray',
  'light_yellow',
  'yellow',
  'orange',
  'light_green',
  'green',
  'dark_green',
  'cyan',
  'light_pink',
  'pink',
  'violet',
  'red',
  'light_blue',
  'blue',
  'dark_blue',
  'black'
];
  
const connectorStartEnd = [
  'stealth',
  'arrow',
  'filled_triangle',
  'triangle',
  'filled_diamond',
  'diamond',
  'filled_oval',
  'oval',
  'erd_one',
  'erd_many',
  'erd_one_or_many',
  'erd_only_one',
  'erd_zero_or_many',
  'erd_zero_or_one'
];

function getRandomElementInArray ( arr ) {
  const randomIndex = Math.floor( Math.random() * arr.length );
  return arr[ randomIndex ];
};
  
const connectorColor = Math.floor( Math.random() * 16777215 ).toString( 16 );
console.log( connectorColor );

// Create a sticky note for each participant.
async function createSticky(name, randomFillColor) {
  await miro.board.createStickyNote({
    content: name,
    style: {
      fillColor: randomFillColor,
    },
    x: 4500,
    y: 4500,
  });
};

// Create a connector line between 2 selected participants.
async function createConnection ( id1, id2 ) {
  await miro.board.createConnector( {

    // Start at participant 1.
    start: { item: id1 },

    // End at participant 2.
    end: { item: id2 },

    startStrokeCap: connectorRandomStartEnd,
    endStrokeCap: connectorRandomStartEnd,
    strokeColor: connectorRandomStrokeColor,

  } );
};

// secretSanta();
