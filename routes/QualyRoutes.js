const router = require("express").Router();
const Client = require('ftp');
const QualyResult = require('../models/QualyResult');
const Season = require('../models/Season');
const Weekend = require('../models/Weekend');
const Driver = require('../models/Driver');
const Track = require('../models/Track');


router.get('/api/readQualyFile/:fileName', async (req, res) => {
    const c = new Client();
    c.on('ready', () => {
        c.get(`/173.234.30.178_11576/results/season2/${req.params.fileName}`, (err, stream) => {
            if (err) throw err;
            let content = '';
            stream.on('data', function (chunk) {
                content += chunk.toString();
            });
            stream.on('end', async function () {
                // content variable now contains all file content. 
                const rawdata = JSON.parse(content);

                const qualyResults = rawdata.Result;
                const qualyLaps = rawdata.Laps;

                let currentSeason = await Season.find({}).populate('weekends');
                currentSeason = currentSeason[currentSeason.length - 1];

                let currentWeekend = currentSeason.weekends[currentSeason.weekends.length - 1];

                let currentTrack = await Weekend.findOne({ _id: currentWeekend }).populate('currentTrack');
                currentTrack = currentTrack.currentTrack;
                console.log('CURRENT TRACK' + currentTrack);

                qualyResults.forEach(async (result) => {
                    if(result.BestLap === 999999999){
                        return
                    }

                    // see if driver is in weekends qualy session (array)
                    const driverInPR = await QualyResult.findOne({guid: result.DriverGuid});

                    if(!driverInPR){
                        // see if driver exists
                        const driverExists = await Driver.findOne({guid: result.DriverGuid});

                        // if exists
                        if(driverExists){
                            //create qualy Result
                            let tmpQR = {
                                driverName: driverExists.name,
                                team: driverExists.team,
                                rawLapTime: result.BestLap,
                                guid: driverExists.guid
                            }
                            const newQR = await QualyResult.create(tmpQR);
                            //push new result into current weekend
                            const updatedWeekend = await Weekend.findOneAndUpdate({_id: currentWeekend}, {$push: {qualy: newQR._id}});
                        }
                        else{
                            //create driver
                            let tmpDriver = {
                                name: result.DriverName,
                                guid: result.DriverGuid,
                                team: 'Reserve'
                            }
                            const newDriver = await Driver.create(tmpDriver);

                            //create new qualy result
                            let tmpQR = {
                                driverName: result.name,
                                team: 'Reserve',
                                rawLapTime: result.BestLap,
                                guid: result.DriverGuid
                            }
                            const newQR = await QualyResult.create(tmpQR);
                            //push new result into current weekend
                            const updatedWeekend = await Weekend.findOneAndUpdate({_id: currentWeekend}, {$push: {qualy: newQR._id}});

                        }
                    }   

                    qualyLaps.forEach(async (lap) => {

                        if (lap.LapTime === result.BestLap) {
                            let updatedDriver = await QualyResult.findOneAndUpdate({ guid: lap.DriverGuid }, { $set: { tire: lap.Tyre } }, { new: true });
                            let track = await Track.findOne({ _id: currentTrack._id });
                            let trackSector1 = track.qSector1;
                            let trackSector2 = track.qSector2;
                            let trackSector3 = track.qSector3;
                            let tmp1 = lap.Sectors[0]
                            let tmp2 = lap.Sectors[1]
                            let tmp3 = lap.Sectors[2]

                            if (tmp1 < updatedDriver.sector1time) {
                                let updatedSectors = await QualyResult.findOneAndUpdate({ guid: lap.DriverGuid }, {
                                    $set:
                                    {
                                        sector1pb: tmp1
                                    }
                                });
                            }
                            if (tmp1 < trackSector1) {
                                let updatedSectors = await Track.findOneAndUpdate({ _id: currentTrack._id }, {
                                    $set:
                                    {
                                        qSector1: tmp1
                                    }
                                });
                            }
                            if (tmp2 < updatedDriver.sector2time) {
                                let updatedSectors = await QualyResult.findOneAndUpdate({ guid: lap.DriverGuid }, {
                                    $set:
                                    {
                                        sector2pb: tmp2
                                    }
                                });
                            }
                            if (tmp2 < trackSector2) {
                                let updatedSectors = await Track.findOneAndUpdate({ _id: currentTrack._id }, {
                                    $set:
                                    {
                                        qSector2: tmp2
                                    }
                                });
                            }
                            if (tmp3 < updatedDriver.sector3time) {
                                let updatedSectors = await QualyResult.findOneAndUpdate({ guid: lap.DriverGuid }, {
                                    $set:
                                    {
                                        sector3pb: tmp3
                                    }
                                });
                            }
                            if (tmp3 < trackSector3) {
                                let updatedSectors = await Track.findOneAndUpdate({ _id: currentTrack._id }, {
                                    $set:
                                    {
                                        qSector3: tmp3
                                    }
                                });
                            }

                            let updatedSectors = await QualyResult.findOneAndUpdate({ guid: lap.DriverGuid }, {
                                $set:
                                {
                                    sector1time: tmp1,
                                    sector2time: tmp2,
                                    sector3time: tmp3,
                                }
                            });
                        }
                    })
                })
                const newResults = await Weekend.find({_id: currentWeekend}).populate('qualy');
                res.status(200);
                res.send(newResults);
            })
        })
    })

    c.connect({
        host: '173.234.30.178',
        port: 8821,
        user: 'nbhapsgs',
        password: '9p:I0*xA59KMfh'
    });
})

router.get('/api/currentQualyResults', async (req, res) => {
    let currentSeason = await Season.find({});
    currentSeason = currentSeason[currentSeason.length - 1];
    // let weekend = currentSeason.weeekends[ - 1];
    let weekend = currentSeason.weekends.length - 1;
    let weekendID = currentSeason.weekends[weekend];
    console.log(weekend);
    let qualyResults = await Weekend.findOne({ _id: weekendID }).populate('qualy');

    res.send(qualyResults);
})


module.exports = router;