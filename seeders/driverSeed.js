const mongoose = require('mongoose');
const driver = require('../models/Driver');

mongoose.connect("mongodb://localhost/narl", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const driverSeed = [
    {
        name: "Batata",
        team: 'Alfa Romeo',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Shelby",
        team: 'Renault',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Cunninglinguist",
        team: 'Racing Point',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Ratajawatakowowski",
        team: 'Alpha Tauri',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "BackMarker",
        team: 'Renault',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "carproblems",
        team: 'Alpha Tauri',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Theo",
        team: 'Ferrari',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Jshylol",
        team: 'Red Bull',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Niski",
        team: 'Mercedes',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "SpiffyTheEagle",
        team: 'Racing Point',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Reagan G",
        team: 'Ferrari',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "sodie",
        team: 'Alpha Tauri',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "dabromanovich",
        team: 'Mercedes',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "CarneAsad",
        team: 'McLaren',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Salami",
        team: 'Alfa Romeo',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "Maquenchie",
        team: 'HAAS',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "cibbirt",
        team: 'HAAS',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "AlexG",
        team: 'McLaren',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "tommygunz_18",
        team: 'Williams',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "MattWins",
        team: 'Red Bull',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },
    {
        name: "jackson_",
        team: 'Williams',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        careerLaps: 0,
        careerPoints: 0,
        careerWins: 0,
        careerFastestLaps: 0
    },


];


driver.deleteMany({})
    .then(() => driver.collection.insertMany(driverSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
