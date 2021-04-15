const Client = require('ftp');
const fs = require('fs')
const router = require("express").Router();
const Drivers = require('../models/Driver');
const PracticeTable = require('../models/PracticeTable');
const PracticeResult = require('../models/PracticeResult');
const Driver = require('../models/Driver');
const Track = require('../models/Track');
const CurrentTrack = require('../models/CurrentTrack');

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
    const found = await PracticeResult.findOne({ fileName: req.params.fileName });
    if (found) {
        res.send();
    }
    else {
        res.send({ fileName: req.params.fileName });
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
                        const found = await Drivers.findOne({ name: driver.DriverName });
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

                    }
                    let currentTrack = await CurrentTrack.find({});
                    currentTrack = currentTrack[0];

                    practiceLaps.forEach(async (lap) => {
                        const trackSectors = await Track.findOne({ _id: currentTrack.track });
                        let trackSector1 = trackSectors.pSector1;
                        let trackSector2 = trackSectors.pSector2;
                        let trackSector3 = trackSectors.pSector3;
                        if (lap.LapTime === driver.BestLap) {
                            let updatedTire = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { tire: lap.Tyre } }, { new: true });
                            let tmp1 = lap.Sectors[0]
                            let tmp2 = lap.Sectors[1]
                            let tmp3 = lap.Sectors[2]
                            let prev1 = updatedTire.sector1time;
                            let prev2 = updatedTire.sector2time;
                            let prev3 = updatedTire.sector3time;
                            let color1, color2, color3;
                            if (tmp1 < trackSector1) {
                                color1 = 'pink';
                                let updatedTrackSector = await Track.findOneAndUpdate({ _id: currentTrack.track }, { $set: { pSector1: tmp1 } });
                            }
                            else if (tmp1 > prev1) {
                                color1 = 'yellow'
                            }
                            else if (tmp1 < prev1) {
                                color1 = 'green'
                            }
                            else {
                                color1 = 'yellow'
                            }

                            if (tmp2 < trackSector2) {
                                color2 = 'pink';
                                let updatedTrackSector = await Track.findOneAndUpdate({ _id: currentTrack.track }, { $set: { pSector2: tmp2 } });

                            }
                            else if (tmp2 > prev2) {
                                color2 = 'yellow'
                            }
                            else if (tmp2 < prev2) {
                                color2 = 'green'
                            }
                            else {
                                color2 = 'yellow'
                            }

                            if (tmp3 < trackSector3) {
                                color3 = 'pink';
                                let updatedTrackSector = await Track.findOneAndUpdate({ _id: currentTrack.track }, { $set: { pSector3: tmp3 } });

                            }
                            else if (tmp3 > prev3) {
                                color3 = 'yellow'
                            }
                            else if (tmp3 < prev3) {
                                color3 = 'green'
                            }
                            else {
                                color3 = 'yellow'
                            }


                            let updatedSectors = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, {
                                $set:
                                {
                                    sector1time: tmp1,
                                    sector1color: color1,
                                    sector2time: tmp2,
                                    sector2color: color2,
                                    sector3time: tmp3,
                                    sector3color: color3
                                }
                            });
                        }
                    })


                })



                practiceLaps.forEach(async (lap) => {
                    let updatedCDriver = await Drivers.findOneAndUpdate({ name: lap.DriverName }, { $inc: { careerLaps: 1 } });
                    let updatedPDriver = await PracticeTable.findOneAndUpdate({ driverName: lap.DriverName }, { $inc: { laps: 1 } });
                })

                const newPR = await PracticeResult.create({ fileName: req.params.fileName });

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