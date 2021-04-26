const router = require("express").Router();
const Driver = require('../models/Driver');
const Team = require('../models/Team');
const EntryList = require('../models/EntryList');
const CurrentTrack = require('../models/CurrentTrack');

router.get('/api/generateServerFiles', async (req, res) => {
    let entry_list = "";
    const entryList = await EntryList.find({});
    let currentTrack = await CurrentTrack.find({}).populate('track', 'numLaps trackFile name config');
    currentTrack = currentTrack[0];
    entryList.forEach((entry, i) => {
        let livery = ""
        switch (entry.driverNumber) {
            case "16":
                livery = '16_Ferrari_SF21'
                break;
            case "55":
                livery = "55_Ferrari_SF21_MW"
                break;
            case "63":
                livery = "63_Williams"
                break;
            case "6":
                livery = "6_Williams";
                break;
            case "44":
                livery = "44_Mercedes_W12";
                break;
            case "77":
                livery = "77_Mercedes_W12";
                break;
            case "18":
                livery = "18_AMR21";
                break;
            case "5":
                livery = "5_AMR21";
                break;
            case "47":
                livery = "Haas_VF21_47_Schumacher_4KHD";
                break;
            case "9":
                livery = "Haas_VF21_09_Schumacher_4KHD";
                break;
            case "3":
                livery = "03_McLaren_MCL35M";
                break;
            case "4":
                livery = "04_McLaren_MCL35M";
                break;
            case "33":
                livery = "33_RedBull_RB16B";
                break;
            case "11":
                livery = "11_RedBull_RB16B";
                break;
            case "31":
                livery = "31_Alpine_Ocon";
                break;
            case "14":
                livery = "14_Alpine_Alonso";
                break;
            case "99":
                livery = "99_Alfa_Romeo_C41";
                break;
            case "7":
                livery = "7_Alfa_Romeo_C41";
                break;
            case "10":
                livery = "10_Scuderia_AlphaTauri_AT02";
                break;
            case "22":
                livery = "22_Scuderia_AlphaTauri_AT02";
                break;

        }
        entry_list += '\n';
        entry_list += `\n[CAR_${i}]`;
        entry_list += `\nMODEL=rss_formula_hybrid_2021`;
        entry_list += `\nSKIN=${livery}`;
        entry_list += `\nSPECTATOR_MODE=0`;
        entry_list += `\nDRIVERNAME=${entry.name}`;
        entry_list += `\nTEAM=${entry.team}`;
        entry_list += `\nGUID=${entry.guid}`;
        entry_list += `\nBALLAST=0`;
        entry_list += `\nRESTRICTOR=0`;
    });

    let server_cfg = `[SERVER]
    NAME=NARL - ${currentTrack.track.name}
    PASSWORD=narlseason2
    ADMIN_PASSWORD=dylanLucas
    SPECTATOR_PASSWORD=specpass
    
    #models of the cars allowed in the server - always use lower case characters
    CARS=rss_formula_hybrid_2021;mercedes_sls
    CONFIG_TRACK=${currentTrack.track.config}
    TRACK=${currentTrack.track.trackFile}
    WELCOME_MESSAGE=cfg/welcome message.txt
    
    MAX_CLIENTS=30
    #Race over time specifies the time in seconds that is left to finish the race, from the moment the first driver passes the finish line
    RACE_OVER_TIME=60
    REGISTER_TO_LOBBY=1
    
    QUALIFY_MAX_WAIT_PERC=120
    
    #Select only if you want to use Pickup mode. Remember fill out entry_list.ini with cars, Multiple tracks are not supported!
    PICKUP_MODE_ENABLED=0
    LOCKED_ENTRY_LIST=1
    
    RACE_PIT_WINDOW_START=1
    RACE_PIT_WINDOW_END=${currentTrack.track.numLaps}
    REVERSED_GRID_RACE_POSITIONS=0
    
    #Server settings DO NOT CHANGE!
    SLEEP_TIME=1
    CLIENT_SEND_INTERVAL_HZ=20
    USE_FLOW_CONTROL=1
    UDP_PORT=11576
    TCP_PORT=11576
    HTTP_PORT=10218
    SEND_BUFFER_SIZE=0
    RECV_BUFFER_SIZE=0
    NUM_THREADS=2
    #End Server Settings
    
    Plugin settings:
    UDP_PLUGIN_LOCAL_PORT=11578
    UDP_PLUGIN_ADDRESS=127.0.0.1:11579
    AUTH_PLUGIN_ADDRESS=
    
    #Specify the Time of Day via the SUN_ANGLE value. Default= -6
    #08:00 = -80
    #09:00 = -64
    #10:00 = -48
    #11:00 = -32
    #12:00 = -16
    #13:00 = 0
    #14:00 = 16
    #15:00 = 32
    #16:00 = 48
    #17:00 = 64
    SUN_ANGLE=-6
    
    #Voting settings
    VOTING_QUORUM=75
    VOTE_DURATION=20
    KICK_QUORUM=50
    BLACKLIST_MODE=1
    
    #in game car assists  0 = off 1 = on
    TC_ALLOWED=0
    ABS_ALLOWED=0
    STABILITY_ALLOWED=0
    AUTOCLUTCH_ALLOWED=0
    FORCE_VIRTUAL_MIRROR=1
    MAX_BALLAST_KG=150
    TYRE_BLANKETS_ALLOWED=1
    #0 is car locked until start 1 is teleport 2 is drivethru, if race has 3 or less laps then the Teleport penalty is enabled
    START_RULE=2
    
    # loop mode: the server restarts from the first track, to disable this set it to 0
    LOOP_MODE=0
    #Penalty if 2 tyres are out of the track, set to -1 to disable
    ALLOWED_TYRES_OUT=4
    DAMAGE_MULTIPLIER=100
    FUEL_RATE=100
    TYRE_WEAR_RATE=150
    LEGAL_TYRES=
    
    RACE_GAS_PENALTY_DISABLED=0
    RESULT_SCREEN_TIME=10
    RACE_EXTRA_LAP=0
    MAX_CONTACTS_PER_KM=5
    
    [PRACTICE]
    NAME=Practice
    TIME=12             
    IS_OPEN=1
    
    [QUALIFY]
    NAME=Qualify
    TIME=12
    IS_OPEN=1

    [RACE]
    NAME=Race
    LAPS=${currentTrack.track.numLaps}
    TIME=0
    WAIT_TIME=60
    IS_OPEN=1                  
    
    [DYNAMIC_TRACK]
    SESSION_START=98
    RANDOMNESS=2
    SESSION_TRANSFER=90
    LAP_GAIN=22
    
    [WEATHER_0]
    GRAPHICS=3_clear
    BASE_TEMPERATURE_AMBIENT=20
    BASE_TEMPERATURE_ROAD=7
    VARIATION_AMBIENT=2
    VARIATION_ROAD=2
    
    [WEATHER_1]
    GRAPHICS=sunny_heavy_clouds
    BASE_TEMPERATURE_AMBIENT=24
    BASE_TEMPERATURE_ROAD=6
    VARIATION_AMBIENT=1
    VARIATION_ROAD=1
    
    [DATA]
    WEBLINK=https://www.elitegameservers.net`;

    console.log(entry_list);
    res.send(server_cfg);
})

module.exports = router;
