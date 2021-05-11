const router = require("express").Router();
const Client = require('ftp');
const RaceResult = require('../models/RaceResult');
const Season = require('../models/Season');
const Weekend = require('../models/Weekend');
const Driver = require('../models/Driver');
const Track = require('../models/Track');


router.get('/api/readRaceFile/:fileName', async (req, res) => {
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

                const raceResults = rawdata.Result;
                const raceLaps = rawdata.Laps;

                let currentSeason = await Season.find({}).populate('weekends');
                currentSeason = currentSeason[currentSeason.length - 1];

                let currentWeekend = currentSeason.weekends[currentSeason.weekends.length - 1];

                let currentTrack = await Weekend.findOne({ _id: currentWeekend }).populate('currentTrack');
                currentTrack = currentTrack.currentTrack;
                console.log('CURRENT TRACK' + currentTrack);
                const points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
                raceResults.forEach(async (result, i) => {
                    if(result.BestLap === 999999999){
                        return
                    }


                    // see if driver is in weekends race session (array)
                    const driverInPR = await RaceResult.findOne({guid: result.DriverGuid});

                    if(!driverInPR){
                        // see if driver exists
                        const driverExists = await Driver.findOne({guid: result.DriverGuid});

                        // if exists
                        if(driverExists){
                            //create race Result
                            let tmpRR = {
                                driverName: driverExists.name,
                                team: driverExists.team,
                                rawLapTime: result.BestLap,
                                guid: driverExists.guid,
                                points: points[i]
                            }
                            const newRR = await RaceResult.create(tmpRR);
                            //push new result into current weekend
                            const updatedWeekend = await Weekend.findOneAndUpdate({_id: currentWeekend}, {$push: {race: newRR._id}});
                        }
                        else{
                            //create driver
                            let tmpDriver = {
                                name: result.DriverName,
                                guid: result.DriverGuid,
                                team: 'Reserve'
                            }
                            const newDriver = await Driver.create(tmpDriver);

                            //create new race result
                            let tmpRR = {
                                driverName: result.name,
                                team: 'Reserve',
                                rawLapTime: result.BestLap,
                                guid: result.DriverGuid
                            }
                            const newRR = await RaceResult.create(tmpRR);
                            //push new result into current weekend
                            const updatedWeekend = await Weekend.findOneAndUpdate({_id: currentWeekend}, {$push: {race: newRR._id}});

                        }
                    } 
                    
                    // update driver points
                    if (i <= 9){
                        if(i === 0){
                            const addedPoints = await Driver.findOneAndUpdate({guid: result.DriverGuid}, {$inc: {points: points[i], careerPoints: points[i], wins: 1, careerWins: 1}});
                        }
                        else{
                            const addedPoints = await Driver.findOneAndUpdate({guid: result.DriverGuid}, {$inc: {points: points[i], careerPoints: points[i]}});
                        }
                    }

                    raceLaps.forEach(async (lap) => {

                        if (lap.LapTime === result.BestLap) {
                            let updatedDriver = await RaceResult.findOneAndUpdate({ guid: lap.DriverGuid }, { $set: { tire: lap.Tyre } }, { new: true });
                            let track = await Track.findOne({ _id: currentTrack._id });
                            let trackSector1 = track.rSector1;
                            let trackSector2 = track.rSector2;
                            let trackSector3 = track.rSector3;
                            let tmp1 = lap.Sectors[0]
                            let tmp2 = lap.Sectors[1]
                            let tmp3 = lap.Sectors[2]

                            if (tmp1 < updatedDriver.sector1time) {
                                let updatedSectors = await RaceResult.findOneAndUpdate({ guid: lap.DriverGuid }, {
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
                                        rSector1: tmp1
                                    }
                                });
                            }
                            if (tmp2 < updatedDriver.sector2time) {
                                let updatedSectors = await RaceResult.findOneAndUpdate({ guid: lap.DriverGuid }, {
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
                                        rSector2: tmp2
                                    }
                                });
                            }
                            if (tmp3 < updatedDriver.sector3time) {
                                let updatedSectors = await RaceResult.findOneAndUpdate({ guid: lap.DriverGuid }, {
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
                                        rSector3: tmp3
                                    }
                                });
                            }

                            let updatedSectors = await RaceResult.findOneAndUpdate({ guid: lap.DriverGuid }, {
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
                const newResults = await Weekend.find({_id: currentWeekend}).populate('race');
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


module.exports = router;