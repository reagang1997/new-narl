const mongoose = require('mongoose');
const team = require('../models/Team');
const driver = require('../models/Driver');

mongoose.connect("mongodb://localhost/narl", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const teamSeed = [
    {
        name: 'Alfa Romeo',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'Renault',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'Alpha Tauri',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'Racing Point',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'Ferrari',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'Mercedes',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'Red Bull',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'McLaren',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'HAAS',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    },
    {
        name: 'Williams',
        points: 0,
        wins: 0,
        fastestLaps: 0,
        drivers: [],
        historyPoints: 0,
        historyWins: 0,
        historyFastestLaps: 0
    }
];

team.deleteMany({})
    .then(() => team.collection.insertMany(teamSeed))
    .then(data => {
        driver.find({})
        .then(data => {
            data.forEach(async (driver) => {
                const teamName = await team.find({ "name": driver.team });
                console.log(teamName);
            });
        })
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const findTeams = function () {
    
}