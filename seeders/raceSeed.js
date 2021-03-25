const mongoose = require('mongoose');
const race = require('../models/RaceResult');
const raceDir = '../Results/Race';
const fs = require('fs');
const path = require('path')


mongoose.connect("mongodb://localhost/narl", {
    useNewUrlParser: true,
    useFindAndModify: false
});

let raceFiles = []

fs.readdir(raceDir, (err, files) => {
    files.forEach(file => {
        let tmp = {
            name: file
        }
        raceFiles.push(tmp);
        let rawdata = fs.readFileSync(path.resolve(raceDir, file));
        let raceData = JSON.parse(rawdata);
        

        console.log(raceFiles);
    });
     race.deleteMany({})
         .then(() => race.collection.insertMany(raceFiles))
});





