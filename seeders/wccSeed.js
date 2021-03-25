const WCC = require('../models/WCC');
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/narl", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const WCCSeed = [
    {
        team: 'Alfa Romeo',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'Renault',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'Alpha Tauri',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'Racing Point',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'Ferrari',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'Mercedes',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'Red Bull',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'McLaren',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'HAAS',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },
    {
        team: 'Williams',
        points: 0,
        wins: 0,
        fastestLaps: 0
    },

]

WCC.deleteMany({})
    .then(() => WCC.collection.insertMany(WCCSeed))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
