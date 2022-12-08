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

// Enter number of participants
async function participantNumber () {
  // Prompt user to enter number of participants.
  const howMany = prompt( "How many friends are participating in the Secret Santa?", "Enter a number between 2 and 20." );

  // Convert the user input to an integer.
  parseInt( howMany );
  console.log( howMany );
  
  // Validate the user input.
  if ( howMany === null || howMany === " " || howMany === NaN ) {
    prompt( "That doesn't look like a number between 2 and 20. Try again.", "Enter a number between 2 and 20." );
  } else if ( howMany < 2 ) {
    prompt( "That's too few. Try again.", "Enter a number between 2 and 20" );
  } else if ( howMany > 20 ) {
    parseInt(prompt( "That's too many. Try again.", "Enter a number between 2 and 20" ));
  } else {
    alert( "Great! Click \"Enter their names\" to proceed." );
  };

  // Return the number of participants.
  return howMany;
};

// Enter names of participants.
async function participantNames () {
 
  // Prompt user to enter names of participants.
  const names = prompt( "What are the names of your friends? Enter a name for each participant.", "Names must be comma-separated." );
  console.log( names );

  // Validate the user input.
  if ( names !== ([A-Za-z,]) ) {
    prompt( "You can enter only alphabetic characters and commas. Try again.", "Names must be comma-separated." );
  } else {
    alert( "Great! Click \"Create sticky notes\" to proceed." );
  };
  
  // Create an array of names.
  const nameList = names.split( "," );
  console.log( nameList );

  // Trim leading and trailing spaces from each name.  
  for (name in nameList) {
    name = name.trim();
  };

  // Return the array of names.
  return nameList;
};

const stickyNoteFillColor = [
  gray,
  light_yellow,
  yellow,
  orange,
  light_green,
  green,
  dark_green,
  cyan,
  light_pink,
  pink,
  violet,
  red,
  light_blue,
  blue,
  dark_blue,
  black
];
  
const connectorStart = [
  stealth,
  arrow,
  filled_triangle,
  triangle,
  filled_diamond,
  diamond,
  filled_oval,
  oval,
  erd_one,
  erd_many,
  erd_one_or_many,
  erd_only_one,
  erd_zero_or_many,
  erd_zero_or_one
];

const connectorEnd = [
  stealth,
  arrow,
  filled_triangle,
  triangle,
  filled_diamond,
  diamond,
  filled_oval,
  oval,
  erd_one,
  erd_many,
  erd_one_or_many,
  erd_only_one,
  erd_zero_or_many,
  erd_zero_or_one
];

const connectorColor = Math.floor( Math.random() * 16777215 ).toString( 16 );
console.log( connectorColor );

// Create a sticky note for each participant.
async function createStickyNotes ( howMany, nameList[i] ) {
  await miro.board.createStickyNote({
    content: nameList[i],
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

    startStrokeCap: connectorRandomStartStrokeCap,
    endStrokeCap: connectorRandomEndStrokeCap,
    strokeColor: connectorRandomStrokeColor,

  } );
};

secretSanta();
