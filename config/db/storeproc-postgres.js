const { sequelize } = require('../../src/api/models/postgres');
const pgFaction = sequelize.models.Faction;
const pgCrater = sequelize.models.Crater;
const pgStartConfig = sequelize.models.StartConfiguration;
const pgPilot = sequelize.models.Pilot;

let pgCreateFactions = async function () {
    console.log("Creating Postgres Faction stored procedures ...");
    await pgFaction.sync({ alter: true });
    await pgFaction.bulkCreate([
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
};

let pgCreateCraters = async function () {
    console.log("Creating Postgres Crater stored procedures ...")
    await pgCrater.sync({ alter: true });
    await pgCrater.bulkCreate([
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
    const cratersCreated = pgCrater.findAndCountAll({});
    console.log('Craters created in Postgres: ', cratersCreated);
};

let pgCreateStartConfigs = async function () {
    console.log("Creating Postgres Start Configuration stored procedures ...");
    await pgStartConfig.sync({ alter: true });
    await pgStartConfig.bulkCreate([
        {"role": "Trader", "description": "Start in the Alpha district equipped for trading.", "location": ["Alpha", "Alpha Trading Post"]},
        {"role": "Scavenger", "description": "Start in the Downtown area equipped for scavenging.", "location": ["Downtown", "Conurbation 2"]},
        {"role": "Aggressor", "description": "Start in the troubled Reservoir zone equipped for combat.", "location": ["Gamma", "Gamma Monorail Depot"]}],
        {validate: true}
    );
};

let pgCreatePilots = async function () {
    console.log("Creating Postgres Pilot stored procedures ...");
    await pgPilot.sync({ alter: true });
    await pgPilot.bulkCreate([
        {"name": "Zero Cool", "status": "Flying around location.name", "location": ["Alpha", "Zero Cool's Hangar"]},
        {"name": "Acid Burn", "location": ["Downtown", "Acid Burn's Hangar"]},
        {"name": "Lord Nicon", "status": "Flying around location.name", "location": ["Riverside", "Lord Nicon's Hangar"]},
        {"name": "Crackatoa", "location": ["Alpha", "Crackatoa's Hangar"]},
        {"name": "Forager", "location": ["Alpha", "Forager's Hangar"]},
        {"name": "Jade Falcon", "status": "Charging their moth at location.name", "location": ["Highrise", "Jade Falcon's Hangar"]},
        {"name": "Coolon Dibsey", "status": "Fighting with pilot.name", "location": ["Alpha", "Coolon Dibsey's Hangar"], "faction": "Pirates", "relationship_police": -1}],
        {validate: true}
    );
};

let pgTearDownTitan = async function () {
    console.log("Tearing down Titan ...");
    await pgPilot.destroy({truncate: true});
    await pgCrater.destroy({truncate: true});
    await pgFaction.destroy({truncate: true});
    
};

module.exports = {
    pgCreateFactions,
    pgCreateCraters,
    pgCreateStartConfigs,
    pgCreatePilots,
    pgTearDownTitan
  };
