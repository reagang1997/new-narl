const Client = require('ftp');
const fs = require('fs')
const router = require("express").Router();
const Drivers = require('../models/Driver');
const PracticeTable = require('../models/PracticeResult');
const PracticeResult = require('../models/PracticeFile');
const Driver = require('../models/Driver');
const Track = require('../models/Track');
const CurrentTrack = require('../models/CurrentTrack');
const Season = require('../models/Season');
const Weekend = require('../models/Weekend');

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

const colorSectors = async () => {
    let currentTrack = await CurrentTrack.find({});
    currentTrack = currentTrack[0];

    const sector1Times = await PracticeTable.find({});
    const sector2Times = await PracticeTable.find({}).sort({ sector2time: 1 });
    const sector3Times = await PracticeTable.find({}).sort({ sector3time: 1 });
    console.log(sector1Times);

    let color1;
    sector1Times.forEach(async (driver) => {
        console.log('hit');
        const track = await Track.findOne({ _id: currentTrack.track });
        let tmpTrackBest1 = track.pSector1;
        let tmp1 = driver.sector1time;
        let tmpPB = driver.sector1pb;
        if (tmp1 <= tmpTrackBest1) {
            color1 = 'pink';
            let updatedTrack = await Track.findOneAndUpdate({ _id: currentTrack.track }, { $set: { pSector1: tmp1 } });
            sector1Times.forEach(async (old) => {
                if (driver.driverName === old.driverName) {
                    return;
                }
                if (driver.sector1color === 'pink') {
                    let updatedColor = await PracticeTable.findOneAndUpdate({ driverName: old.driverName }, {
                        $set:
                        {
                            sector1color: 'green'
                        }
                    });
                }
            })
        }
        else if (tmp1 > tmpPB) {
            color1 = 'yellow'
        }
        else if (tmp1 < tmpPB) {
            color1 = 'green'
        }
        let updatedSectors = await PracticeTable.findOneAndUpdate({ driverName: driver.driverName }, {
            $set:
            {
                sector1color: color1
            }
        });
    })

    // sector2Times.forEach(async (driver) => {
    //     const track = await Track.findOne({ _id: currentTrack.track });
    //     let tmpTrackBest2 = track.pSector2;
    //     let tmpSector = driver.sector2time;
    //     let tmpPB = driver.sector2pb;
    //     if (tmpSector <= tmpTrackBest2) {
    //         color1 = 'pink';
    //         let updatedTrack = await Track.findOneAndUpdate({ _id: currentTrack.track }, { $set: { pSector2: tmpSector } });
    //         colorSectors();
    //         return;
    //     }
    //     else if (tmpSector > tmpPB) {
    //         color1 = 'yellow'
    //     }
    //     else if (tmpSector < tmpPB) {
    //         color1 = 'green'
    //     }
    //     let updatedSectors = await PracticeTable.findOneAndUpdate({ driverName: driver.driverName }, {
    //         $set:
    //         {
    //             sector2color: color1
    //         }
    //     });
    // })

    // sector3Times.forEach(async (driver) => {
    //     const track = await Track.findOne({ _id: currentTrack.track });
    //     let tmpTrackBest3 = track.pSector3;
    //     let tmpSector = driver.sector3time;
    //     let tmpPB = driver.sector3pb;
    //     if (tmpSector <= tmpTrackBest3) {
    //         color1 = 'pink';
    //         let updatedTrack = await Track.findOneAndUpdate({ _id: currentTrack.track }, { $set: { pSector3: tmpSector } });
    //         colorSectors();
    //         return;
    //     }
    //     else if (tmpSector > tmpPB) {
    //         color1 = 'yellow'
    //     }
    //     else if (tmpSector < tmpPB) {
    //         color1 = 'green'
    //     }
    //     let updatedSectors = await PracticeTable.findOneAndUpdate({ driverName: driver.driverName }, {
    //         $set:
    //         {
    //             sector3color: color1
    //         }
    //     });
    // })

}

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


                let foundDriver = false;

                let currentSeason = await Season.find({}).populate('weekends');
                currentSeason = currentSeason[currentSeason.length - 1];

                let currentWeekend = currentSeason.weekends[currentSeason.weekends.length - 1];

                let currentTrack = await Weekend.findOne({ _id: currentWeekend }).populate('currentTrack');
                currentTrack = currentTrack.currentTrack;
                console.log('CURRENT TRACK' + currentTrack);

                practiceResults.forEach(async (result) => {
                    if(result.BestLap === 999999999){
                        return
                    }

                    // see if driver is in weekends practice session (array)
                    const driverInPR = await PracticeTable.findOne({guid: result.DriverGuid});

                    if(!driverInPR){
                        // see if driver exists
                        const driverExists = await Driver.findOne({guid: result.DriverGuid});

                        // if exists
                        if(driverExists){
                            //create practice Result
                            let tmpPR = {
                                driverName: driverExists.name,
                                team: driverExists.team,
                                rawLapTime: result.BestLap,
                                guid: driverExists.guid
                            }
                            const newPR = await PracticeTable.create(tmpPR);
                            //push new result into current weekend
                            const updatedWeekend = await Weekend.findOneAndUpdate({_id: currentWeekend}, {$push: {practice: newPR._id}});
                        }
                        else{
                            //create driver
                            let tmpDriver = {
                                name: result.DriverName,
                                guid: result.DriverGuid,
                                team: 'Reserve'
                            }
                            const newDriver = await Driver.create(tmpDriver);

                            //create new practice result
                            let tmpPR = {
                                driverName: result.name,
                                team: 'Reserve',
                                rawLapTime: result.BestLap,
                                guid: result.DriverGuid
                            }
                            const newPR = await PracticeTable.create(tmpPR);
                            //push new result into current weekend
                            const updatedWeekend = await Weekend.findOneAndUpdate({_id: currentWeekend}, {$push: {practice: newPR._id}});

                        }
                    }   

                    practiceLaps.forEach(async (lap) => {

                        if (lap.LapTime === result.BestLap) {
                            let updatedDriver = await PracticeTable.findOneAndUpdate({ guid: lap.DriverGuid }, { $set: { tire: lap.Tyre } }, { new: true });
                            let track = await Track.findOne({ _id: currentTrack._id });
                            let trackSector1 = track.pSector1;
                            let trackSector2 = track.pSector2;
                            let trackSector3 = track.pSector3;
                            let tmp1 = lap.Sectors[0]
                            let tmp2 = lap.Sectors[1]
                            let tmp3 = lap.Sectors[2]

                            if (tmp1 < updatedDriver.sector1time) {
                                let updatedSectors = await PracticeTable.findOneAndUpdate({ guid: lap.DriverGuid }, {
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
                                        pSector1: tmp1
                                    }
                                });
                            }
                            if (tmp2 < updatedDriver.sector2time) {
                                let updatedSectors = await PracticeTable.findOneAndUpdate({ guid: lap.DriverGuid }, {
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
                                        pSector2: tmp2
                                    }
                                });
                            }
                            if (tmp3 < updatedDriver.sector3time) {
                                let updatedSectors = await PracticeTable.findOneAndUpdate({ guid: lap.DriverGuid }, {
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
                                        pSector3: tmp3
                                    }
                                });
                            }

                            let updatedSectors = await PracticeTable.findOneAndUpdate({ guid: lap.DriverGuid }, {
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

                const newPR = await PracticeResult.create({ fileName: req.params.fileName });

                const newResults = await Weekend.find({_id: currentWeekend}).populate('practice');
                res.status(200);
                res.send(newResults);
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



router.get('/api/getTrackSectors', async (req, res) => {
    let currentTrack = await CurrentTrack.find({});
    currentTrack = currentTrack[0];

    const track = await Track.findOne({ _id: currentTrack.track });

    res.send(track);
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