import axios from 'axios';

export default {
    getRaces: function(){
        axios.get('http://localhost:8080/api/raceResults')
            .then(res => {return res});
    }
}