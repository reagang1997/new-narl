const router = require("express").Router();
const Team = require('../models/Team');

router.post('/api/CreateNewTeam', async (req, res) => {
    const newTeam = await Team.create(req.body);
    res.send(newTeam);
});

router.get('/api/getAllTeams', async (req, res) => {
    const allTeams = await Team.find({});
    res.send(allTeams);
})

router.put('/api/setTeamStats/:TeamID', async (req, res) => {
    const stat = req.body.stat;
    const value = req.body.value;
    switch (stat) {
        case 'points':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { points: value } }, { new: true });
            break;
        case 'wins':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { wins: value } }, { new: true });
            break;
        case 'fastestLaps':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { fastestLaps: value } }, { new: true });
            break;
        case 'historyLaps':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { historyLaps: value } }, { new: true });
            break;
        case 'historyPoints':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { historyPoints: value } }, { new: true });
            break;
        case 'historyWins':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { historyWins: value } }, { new: true });
            break;
        case 'historyFastestLaps':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { historyFastestLaps: value } }, { new: true });
            break;
        case 'isActive':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { isActive: value } }, { new: true });
            break;
        case 'drivers':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $push: { drivers: value } }, { new: true });
            break;
        case 'name':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { name: value } }, { new: true });
            break;
        case 'wcc':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $set: { wcc: value } }, { new: true });
            break;

    }

    res.send(updatedTeam);
});

router.put('/api/IncTeamStats/:TeamID', async (req, res) => {
    const stat = req.body.stat;
    const value = req.body.value;
    switch (stat) {
        case 'points':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $inc: { points: value } }, { new: true });
            break;
        case 'wins':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $inc: { wins: value } }, { new: true });
            break;
        case 'fastestLaps':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $inc: { fastestLaps: value } }, { new: true });
            break;
        case 'historyLaps':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $inc: { historyLaps: value } }, { new: true });
            break;
        case 'historyPoints':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $inc: { historyPoints: value } }, { new: true });
            break;
        case 'historyWins':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $inc: { historyWins: value } }, { new: true });
            break;
        case 'historyFastestLaps':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $inc: { historyFastestLaps: value } }, { new: true });
            break;
        case 'wcc':
            updatedTeam = await Team.findOneAndUpdate({ _id: req.params.TeamID }, { $inc: { wcc: value } }, { new: true });
            break;

    }

    res.send(updatedTeam);
});

router.get('/api/teams/:name', async (req, res) => {
    const found = await Team.findOne({name: req.params.name});
    res.send(found);
})

router.get('/api/team/clearTeamPoints', async (req, res) => {
    const cleared = await Team.updateMany({}, {$set: {points: 0}});
    res.send(cleared);
})


module.exports = router;