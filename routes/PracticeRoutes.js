const Client = require('ftp');
const fs = require('fs')
const router = require("express").Router();
const Drivers = require('../models/Driver');
const PracticeTable = require('../models/PracticeTable');
const PR = require('../models/PracticeResult');

router.get('/api/lastPractice', async (req, res) => {
    console.log('hig')
    const c = new Client();
    let newFile;
    c.on('ready', () => {
        // /173.234.30.178_11576 is root dir
        c.list('/173.234.30.178_11576/results', (err, list) => {
            if (err) throw err;
            list.sort(compare);
            let files = [];
            for (let i = 2; i < list.length; i++) {
                files.push(list[i]);
            }
            console.log(files);
            let foundCount = 0;
            files.forEach(async (file, i) => {
                let { name } = file;
                let foundFile = await PR.findOne({ fileName: name });
                if (!foundFile) {
                    let newPR = await PR.create({ fileName: name });

                    c.get(`/173.234.30.178_11576/results/${name}`, (err, stream) => {
                        if (err) throw err;
                        let content = '';
                        stream.on('data', function (chunk) {
                            content += chunk.toString();
                        });
                        stream.on('end', function () {
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
                                    driverInDB = await PracticeTable.create({ driverName: driver.DriverName });
                                    let driverTeam = await Drivers.findOne({ name: driver.DriverName });
                                    if (driverTeam.team.length > 2) {
                                        let updatedTeam = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { teamName: driverTeam.team } });

                                    }
                                }


                                if (driver.BestLap < driverInDB.rawLapTime) {
                                    let updatedDriver = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { rawLapTime: driver.BestLap } });
                                    practiceLaps.forEach(async (lap) => {
                                        if (lap.LapTime === driver.BestLap) {
                                            let updatedTire = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { tire: lap.Tyre } });
                                        }
                                        console.log('updated: ', lap.DriverName)

                                        let updatedCDriver = await Drivers.findOneAndUpdate({ name: lap.DriverName }, { $inc: { careerLaps: 1 } });
                                        let updatedPDriver = await PracticeTable.findOneAndUpdate({ driverName: lap.DriverName }, { $inc: { laps: 1 } });
                                    })
                                }
                            })


                        });
                    });
                }
                else {
                    console.log('found')
                    foundCount++;
                    console.log(foundCount);
                }
                if (i === files.length - 1) {
                    console.log(foundCount);
                    console.log('list l: ', files.length);
                    if (foundCount === files.length) {
                        console.log('no update')
                        res.status(204);
                    }
                    else {
                        console.log('updates');
                        res.status(200);
                    }
                    res.send({})

                }
            })

        });


        // c.get('/173.234.30.178_11576/cfg/entry_list.ini', (err, stream) => {
        //     if(err) throw err;
        //     console.log(stream);
        //     stream.once('close' , () => c.end());
        //     stream.pipe(fs.createWriteStream('D:/foo-local-copy.txt'));
        // });
        // c.put('D:/tmp.ini', '/173.234.30.178_11576/tmp.ini', (err) => {
        //     if(err) throw err;
        // })
    });

    c.connect({
        host: '173.234.30.178',
        port: 8821,
        user: 'nbhapsgs',
        password: '9p:I0*xA59KMfh'
    });

})

router.get('/api/lastPractice/seed1', async (req, res) => {
    console.log('hig')
    const c = new Client();
    let newFile;
    c.on('ready', () => {
        // /173.234.30.178_11576 is root dir
        c.list('/173.234.30.178_11576/results', (err, list) => {
            if (err) throw err;
            list.sort(compare);
            console.log(list[0]);
            newFile = list[0];

            c.get(`/173.234.30.178_11576/results/${newFile.name}`, (err, stream) => {
                if (err) throw err;
                let content = '';
                stream.on('data', function (chunk) {
                    content += chunk.toString();
                });
                stream.on('end', function () {
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
                            driverInDB = await PracticeTable.create({ driverName: driver.DriverName })
                        }


                        if (driver.BestLap < driverInDB.rawLapTime) {
                            let updatedDriver = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { rawLapTime: driver.BestLap } });
                            practiceLaps.forEach(async (lap) => {
                                if (lap.LapTime === driver.BestLap) {
                                    let updatedTire = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { tire: lap.Tyre } });
                                }
                                console.log('updated: ', lap.DriverName)

                                let updatedCDriver = await Drivers.findOneAndUpdate({ name: lap.DriverName }, { $inc: { careerLaps: 1 } });
                                let updatedPDriver = await PracticeTable.findOneAndUpdate({ driverName: lap.DriverName }, { $inc: { laps: 1 } });
                            })
                        }
                    })

                    res.status(200);

                });
            });
        });


        // c.get('/173.234.30.178_11576/cfg/entry_list.ini', (err, stream) => {
        //     if(err) throw err;
        //     console.log(stream);
        //     stream.once('close' , () => c.end());
        //     stream.pipe(fs.createWriteStream('D:/foo-local-copy.txt'));
        // });
        // c.put('D:/tmp.ini', '/173.234.30.178_11576/tmp.ini', (err) => {
        //     if(err) throw err;
        // })
    });

    c.connect({
        host: '173.234.30.178',
        port: 8821,
        user: 'nbhapsgs',
        password: '9p:I0*xA59KMfh'
    });

})

router.get('/api/lastPractice/seed2', async (req, res) => {
    console.log('hig')
    const c = new Client();
    let newFile;
    c.on('ready', () => {
        // /173.234.30.178_11576 is root dir
        c.list('/173.234.30.178_11576/results', (err, list) => {
            if (err) throw err;
            list.sort(compare);
            console.log(list[1]);
            newFile = list[1];

            c.get(`/173.234.30.178_11576/results/${newFile.name}`, (err, stream) => {
                if (err) throw err;
                let content = '';
                stream.on('data', function (chunk) {
                    content += chunk.toString();
                });
                stream.on('end', function () {
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
                            driverInDB = await PracticeTable.create({ driverName: driver.DriverName })
                        }


                        if (driver.BestLap < driverInDB.rawLapTime) {
                            let updatedDriver = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { rawLapTime: driver.BestLap } });
                            practiceLaps.forEach(async (lap) => {
                                if (lap.LapTime === driver.BestLap) {
                                    let updatedTire = await PracticeTable.findOneAndUpdate({ driverName: driver.DriverName }, { $set: { tire: lap.Tyre } });
                                }
                                console.log('updated: ', lap.DriverName)

                                let updatedCDriver = await Drivers.findOneAndUpdate({ name: lap.DriverName }, { $inc: { careerLaps: 1 } });
                                let updatedPDriver = await PracticeTable.findOneAndUpdate({ driverName: lap.DriverName }, { $inc: { laps: 1 } });
                            })
                        }
                    })

                    res.send(updatedDriver);

                });
            });
        });


        // c.get('/173.234.30.178_11576/cfg/entry_list.ini', (err, stream) => {
        //     if(err) throw err;
        //     console.log(stream);
        //     stream.once('close' , () => c.end());
        //     stream.pipe(fs.createWriteStream('D:/foo-local-copy.txt'));
        // });
        // c.put('D:/tmp.ini', '/173.234.30.178_11576/tmp.ini', (err) => {
        //     if(err) throw err;
        // })
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