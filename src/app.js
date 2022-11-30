async function secretSanta () {

  const cards = await miro.board.getSelection();
  console.log( cards );
  let ids = cards.map( card => card.id );
  console.log( ids );

  const participants = buildCollection(ids);


  while ( Object.keys(participants).length > 1 ) {
    const participantId1 = pickParticipant( participants );
    const participantId2 = pickParticipant( participants );

    // create connection
    await createConnection( participantId1, participantId2 );
    console.log( participants )
  };
};

function buildCollection(ids) {
  let collection = {};
  ids.forEach( id => {
    collection[ id ] = id;
  } );
  return collection;
};

function pickParticipant ( participants ) {
  const ids = Object.keys( participants );
  console.log( ids );
  const random = Math.floor(Math.random() * ids.length);
//  console.log( random );

  const randomKey = ids[random];
//  console.log( randomKey );

  delete participants[ randomKey ];
//  console.log( participants );
  
  return randomKey
}

async function createConnection ( id1, id2 ) {
  await miro.board.createConnector( {
    start: { item: id1 },
    end: { item: id2 },
  } );
};

secretSanta();