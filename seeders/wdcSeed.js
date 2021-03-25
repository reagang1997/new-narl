const wdcDriver = require('../models/WDC');
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/narl", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const wdcSeed = [
    {
        name: "Batata",
        points: 102,
        wins: 4,
        fastestLaps: 2,
        team: 'Alfa Romeo'
    },
    {
        name: "Cunninglinguist",
        points: 53,
        wins: 0,
        fastestLaps: 0,
        team: 'Racing Point'
    },
    {
        name: "Shelby",
        points: 45,
        wins: 0,
        fastestLaps: 0,
        team: 'Renault'
    },
    {
        name: "carproblems",
        points: 36,
        wins: 0,
        fastestLaps: 0,
        team: 'Alpha Tauri'
    },
    {
        name: "Jshylol",
        points: 25,
        wins: 0,
        fastestLaps: 0,
        team: 'Red Bull'
    },
    {
        name: "BackMarker",
        points: 24,
        wins: 0,
        fastestLaps: 1,
        team: 'Renault'
    },
    {
        name: "Niski",
        points: 23,
        wins: 0,
        fastestLaps: 1,
        team: 'Mercedes'
    },
    {
        name: "Ratajawatakowowski",
        points: 36,
        wins: 0,
        fastestLaps: 0,
        team: 'Red Bull'
    },
    {
        name: "Theo",
        points: 26,
        wins: 0,
        fastestLaps: 0,
        team: 'Ferrari'
    },
    {
        name: "Reagan G",
        points: 7,
        wins: 0,
        fastestLaps: 0,
        team: 'Ferrari'
    },
    {
        name: "sodie",
        points: 6,
        wins: 0,
        fastestLaps: 0,
        team: 'Alpha Tauri'
    },
    {
        name: "dabromanovich",
        points: 6,
        wins: 0,
        fastestLaps: 0,
        team: 'Mercedes'
    },
    {
        name: "SpiffyTheEagle",
        points: 7,
        wins: 0,
        fastestLaps: 0,
        team: 'Racing Point'
    },
    {
        name: "Salami",
        points: 2,
        wins: 0,
        fastestLaps: 0,
        team: 'Alfa Romeo'
    },
    {
        name: "cibbirt",
        points: 1,
        wins: 0,
        fastestLaps: 0,
        team: 'HAAS'
    },
    {
        name: "AlexG",
        points: 0,
        wins: 0,
        fastestLaps: 0,
        team: 'McLaren'
    },
    {
        name: "tommygunz_18",
        points: 0,
        wins: 0,
        fastestLaps: 0,
        team: 'Williams'
    },
    {
        name: "CarneAsad",
        points: 1,
        wins: 0,
        fastestLaps: 0,
        team: 'McLaren'
    },
    {
        name: "MattWins",
        points: 0,
        wins: 0,
        fastestLaps: 0,
        team: 'Red Bull'
    },
    {
        name: "Maquenchie",
        points: 2,
        wins: 0,
        fastestLaps: 0,
        team: 'HAAS'
    },
    {
        name: "jackson_",
        points: 0,
        wins: 0,
        fastestLaps: 0,
        team: 'Williams'
    },
]



wdcDriver.deleteMany({})
    .then(() => wdcDriver.collection.insertMany(wdcSeed))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });