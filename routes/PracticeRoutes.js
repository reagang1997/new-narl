const Client = require('ftp');
const fs = require('fs')
const router = require("express").Router();
const Drivers = require('../models/Driver');
const PracticeTable = require('../models/PracticeTable');
const PracticeResult = require('../models/PracticeResult');
const Driver = require('../models/Driver');

router.get('/api/clearPracticeResults', async (req, res) => {
    const deleted = await PracticeTable.deleteMany({});
    res.send(deleted);
})

router.get('/api/allResults', async (req, res) => {
    const c = new Client();

    c.on('ready', () => {
        // /173.234.30.178_11576 is root dir
        c.list('/173.234.30.178_11576/results', (err, list) => {
            if (err) throw err;
            list.sort(compare);
            res.send(list);
        })
    })

    c.connect({
        host: '173.234.30.178',
        port: 8821,
        user: 'nbhapsgs',
        password: '9p:I0*xA59KMfh'
    });
});

router.get('/api/findResult/:fileName', async (req, res) => {
    const found = await PracticeResult.findOne({fileName: req.params.fileName});
    if(found){
        res.send();
    }
    else{
        res.send({fileName: req.params.fileName});
    }
})

router.get('/api/readFile/:fileName', async (req, res) => {
    const c = new Client();
    c.on('ready', () => {
        c.get(`/173.234.30.178_11576/results/${req.params.fileName}`, (err, stream) => {
            if (err) throw err;
            let content = '';
            stream.on('data', function (chunk) {
                content += chunk.toString();
            });
            stream.on('end', async function () {
                // content variable now contains all file content. 
                const rawdata = JSON.parse(content);
    
                const practiceResults = rawdata.Result;
                const practiceLaps = rawdata.Laps;
    
    
                let updatedDriver;
    
                practiceResults.forEach(async (driver) => {
    
                    if (driver.BestLap === 999999999) {
                        return;
                    }
                    let driverInDB = await PracticeTable.findOne({ driverName: driver.DriverName });
    
                    if (!driverInDB) {
                        const found = await Drivers.findOne({name: driver.DriverName});
                        console.log("found" + found);
                        console.log('TEAM');
                        const newPR = {
                            driverName: driver.DriverName,
                            teamName: found.team
                        };
                        driverInDB = await PracticeTable.create(newPR)
                    }
    
    
                    if (driver.BestLap < driverInDB.rawLapTime) {
                        let updatedDriver = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { rawLapTime: driver.BestLap } });
                        practiceLaps.forEach(async (lap) => {
                            if (lap.LapTime === driver.BestLap) {
                                let updatedTire = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { tire: lap.Tyre } });
                            }
    
                            let updatedCDriver = await Drivers.findOneAndUpdate({ name: lap.DriverName }, { $inc: { careerLaps: 1 } });
                            let updatedPDriver = await PracticeTable.findOneAndUpdate({ driverName: lap.DriverName }, { $inc: { laps: 1 } });
                        })
                    }
                })

                const newPR = await PracticeResult.create({fileName: req.params.fileName});
                
                res.status(200);
                res.send({});
    
            });
        });
    });

    c.connect({
        host: '173.234.30.178',
        port: 8821,
        user: 'nbhapsgs',
        password: '9p:I0*xA59KMfh'
    });
    
})






//get practice results
router.get('/api/practiceResults', async (req, res) => {
    const practiceResults = await PracticeTable.find({}).sort({ rawLapTime: 1 });

    res.send(practiceResults);
});



function compare(a, b) {
    if (a.name < b.name) {
        return 1;
    }
    if (a.name > b.name) {
        return -1;
    }
    return 0;
}


module.exports = router;