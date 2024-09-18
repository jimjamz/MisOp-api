const { moFaction } = require('../../src/api/models/mongo/faction');
const { moCrater } = require('../../src/api/models/mongo/crater');
const { moBuilding } = require('../../src/api/models/mongo/building');
const { moStartConfig } = require('../../src/api/models/mongo/startConfiguration');
const { moPilot } = require('../../src/api/models/mongo/pilot');

let moCreateFactions = async function () {
    console.log("Creating MongoDB Faction stored procedures ...");
    await moFaction.insertMany([
        {"name": "EstateAgents", "friend": "Flyers"},
        {"name": "Flyers", "friend": "Flyers"},
        {"name": "Klamp-G", "friend": "Scrubbers", "enemy": "Lazarus"},
        {"name": "Lazarus", "friend": "Skinners", "enemy": "Klamp-G"},
        {"name": "Pirates", "enemy": "Police"},
        {"name": "Police", "enemy": "Pirates"},
        {"name": "Scrubbers", "friend": "Klamp-G", "enemy": "Skinners"},
        {"name": "Skinners", "friend": "Lazarus", "enemy": "Scrubbers"}],
        {validate: true}
    );
    moFaction.countDocuments({})
    .then((result) => {
        console.log('Factions created in Mongo: ', result);
    });
};

let moCreateCraters = async function () {
    console.log("Creating MongoDB Crater stored procedures ...")
    await moCrater.insertMany([
        {"name": "Alpha", "faction": "Lazarus", "connectingCraters": ["Downtown", "Haven"], "hasMonorail": true},
        {"name": "Downtown", "faction": "Pirates", "connectingCraters": ["Alpha", "Gamma", "Highrise", "Port"], "hasMonorail": true},
        {"name": "Gamma", "faction": "Klamp-G", "connectingCraters": ["Downtown", "Midway", "Riverside"], "hasMonorail": false},
        {"name": "Haven", "faction": "Pirates", "connectingCraters": ["Alpha", "Mines"], "hasMonorail": true},
        {"name": "Highrise", "faction": "Lazarus", "connectingCraters": ["Downtown", "Reservoir"], "hasMonorail": true},
        {"name": "Mines", "faction": "Flyers", "connectingCraters": ["Haven", "Midway", "Port"], "hasMonorail": true},
        {"name": "Port", "faction": "Lazarus", "connectingCraters": ["Downtown", "Mines"], "hasMonorail": true},
        {"name": "Reservoir", "faction": "Klamp-G", "connectingCraters": ["Highrise", "Riverside"], "hasMonorail": false},
        {"name": "Riverside", "faction": "Klamp-G", "connectingCraters": ["Gamma", "Reservoir"], "hasMonorail": false}],
        {validate: true}
    );
    moCrater.countDocuments({})
    .then((result) => {
        console.log('Craters created in Mongo: ', result);
    });
    };

let moCreateBuildings = async function () {
    console.log("Creating MongoDB Building stored procedures ...")
    await moBuilding.insertMany([
        {"name": "God Hangar", "crater": "Downtown", "faction": "Flyers"},
        {"name": "Alpha Trading Post", "crater": "Alpha", "faction": "Flyers"},
        {"name": "Hardwarp FM", "crater": "Downtown", "faction": "Flyers"},
        {"name": "Gamma Monorail Depot", "crater": "Gamma", "faction": "Flyers", "monorailTerminal": true},
        {"name": "Conurbation 2", "crater": "Downtown", "faction": "Flyers"},
        {"name": "Empty Hangar A3", "crater": "Alpha", "faction": "EstateAgents"},
        {"name": "Empty Hangar A5", "crater": "Alpha", "faction": "EstateAgents"}, //Zero Cool's Hangar
        {"name": "Vacant 0001", "crater": "Downtown", "faction": "EstateAgents"}, // Acid Burn's Hangar
        {"name": "Vacant R1", "crater": "Riverside", "faction": "EstateAgents"}, // Lord Nicon's Hangar
        {"name": "Pirate's Nest", "crater": "Highrise", "faction": "EstateAgents"}, // Jade Falcon's Hangar
        {"name": "Empty Hangar A6", "crater": "Alpha", "faction": "EstateAgents"}], // Coolon Dibsey's Hangar
        {validate: true}
    );
    moBuilding.countDocuments({})
    .then((result) => {
        console.log('Buildings created in Mongo: ', result);
    });
};

let moCreateStartConfigs = async function () {
    console.log("Creating MongoDB Start Configuration stored procedures ...");
    await moStartConfig.insertMany([
        {"role": "Trader", "description": "Start in the Alpha district equipped for trading.", "location": ["Alpha", "Alpha Trading Post"]},
        {"role": "Scavenger", "description": "Start in the Downtown area equipped for scavenging.", "location": ["Downtown", "Conurbation 2"]},
        {"role": "Aggressor", "description": "Start in the troubled Reservoir zone equipped for combat.", "location": ["Gamma", "Gamma Monorail Depot"]}],
        {validate: true}
    );
    moStartConfig.countDocuments({})
    .then((result) => {
        console.log('Start Configurations created in Mongo: ', result);
    });
};

let moCreatePilots = async function () {
    console.log("Creating MongoDB Pilot stored procedures ...");
    await moPilot.insertMany([
        {"name": "Zero Cool", "status": "Flying around location.name", "location": ["Alpha", "Zero Cool's Hangar"]},
        {"name": "Acid Burn", "location": ["Downtown", "Acid Burn's Hangar"]},
        {"name": "Lord Nicon", "status": "Flying around location.name", "location": ["Riverside", "Lord Nicon's Hangar"]},
        {"name": "Jade Falcon", "status": "Charging their moth at location.name", "location": ["Highrise", "Jade Falcon's Hangar"], "faction": "Pirates"},
        {"name": "Coolon Dibsey", "status": "Fighting with pilot.name", "location": ["Alpha", "Coolon Dibsey's Hangar"], "faction": "Pirates", "relationship_police": -1}],
        {validate: true}
        // assign pilot ownership to hangars once relationships are created
    );
    moPilot.countDocuments({})
    .then((result) => {
        console.log('Pilots created in Mongo: ', result);
    });
};

let moTearDownTitan = async function () {
    console.log("Tearing down Titan ...");
    await moPilot.deleteMany({});
    await moStartConfig.deleteMany({});
    await moBuilding.deleteMany({});
    await moCrater.deleteMany({});
    await moFaction.deleteMany({});
    
};

module.exports = {
    moCreateFactions,
    moCreateCraters,
    moCreateBuildings,
    moCreateStartConfigs,
    moCreatePilots,
    moTearDownTitan
  };
