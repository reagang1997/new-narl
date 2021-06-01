import React from 'react';
import { Col, Card } from 'react-bootstrap';
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from '../theme/Header/Header';
import HeaderLinks from '../theme/Header/HeaderLinks';
import Parallax from '../theme/Parallax/Parallax'
import HeaderLinksRight from '../theme/Header/HeaderLinksRight.js';
const useStyles = makeStyles(styles);
const Schedule = ({loggedIn}) => {

    const classes = useStyles();

    return (
        <div>
            <Header
                color="transparent"
                brand="NARL"
                leftLinks={<HeaderLinks />}
                rightLinks={<HeaderLinksRight loggedIn={loggedIn}/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white",
                }}
            />

            <Parallax
                small
                filter
                image={require("../../assets/img/race-info-bg.jpg").default}
            />

            <Card body className={classNames(classes.main, classes.mainRaised, 'f1')}>

                <h1 style={{ width: 'fit-content', margin: 'auto', marginBottom: '5px' }}>Current Schedule</h1>
                <table className="table table-responsive-lg">

                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "100px" }}>Date</th>
                            <th scope="col" style={{ width: "100px" }}>Track</th>
                            <th scope="col" style={{ width: "100px" }}>Download Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="0">
                            <th >1/17</th>
                            <td>Australia</td>
                            <td>
                                <a target="_blank" href="https://sharemods.com/286z4nv7yqt8/melbourne_2019_v1.5.7z.html">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">1/24</th>
                            <td>Bahrain</td>
                            <td>
                                <a target="_blank" href="http://www.mediafire.com/file/ehyd9j6fyonosl8/bahrain_2020_1_1.7z/file">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">1/31</th>
                            <td>Imola</td>
                            <td>
                                Kunos
</td>
                        </tr>
                        <tr>
                            <th scope="row">2/7</th>
                            <td>TBD</td>
                            <td>
                                <a href="#">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2/14</th>
                            <td>Spain</td>
                            <td>
                                <a target="_blank" href="https://www.racedepartment.com/downloads/circuit-de-catalunya.3328/">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2/21</th>
                            <td>Monaco</td>
                            <td>
                                <a target="_blank" href="https://assettocorsa.club/mods/tracks/circuit-de-monaco.html">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2/28</th>
                            <td>Baku</td>
                            <td>
                                <a href="#">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3/7</th>
                            <td>Break</td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3/14</th>
                            <td>Break</td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3/21</th>
                            <td>Break</td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3/28</th>
                            <td>Canada</td>
                            <td>
                                <a target="_blank" href="https://www.racedepartment.com/downloads/circuit-gilles-villeneuve-montr%C3%A9al-qu%C3%A9bec-canada.4439/">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">4/4</th>
                            <td>France</td>
                            <td>
                                <a target="_blank" href="https://assettocorsa.club/mods/tracks/paul-ricard-httt.html">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">4/11</th>
                            <td>Austria</td>
                            <td>
                                Kunos (Red Pack)
</td>
                        </tr>
                        <tr>
                            <th scope="row">4/18</th>
                            <td>Silverstone</td>
                            <td>
                                Kunos
</td>
                        </tr>
                        <tr>
                            <th scope="row">4/25</th>
                            <td>Hungary</td>
                            <td>
                                <a target="_blank" href="https://assettocorsa.club/mods/tracks/hungaroring.html">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">5/2</th>
                            <td>Spa</td>
                            <td>
                                Kunos
</td>
                        </tr>
                        <tr>
                            <th scope="row">5/9</th>
                            <td>Netherlands</td>
                            <td>
                                <a target="_blank" href="https://www.racedepartment.com/downloads/zandvoort-f1-layout.31840/">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">5/16</th>
                            <td>Monza</td>
                            <td>
                                Kunos
</td>
                        </tr>
                        <tr>
                            <th scope="row">5/23</th>
                            <td>Russia</td>
                            <td>
                                <a target="_blank" href="https://assettocorsa.club/mods/tracks/sochi-autodrom.html">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">5/30</th>
                            <td>Singapore</td>
                            <td>
                                <a target="_blank" href="https://assettocorsa.club/mods/tracks/marina-bay-street-circuit.html">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">6/6</th>
                            <td>Japan</td>
                            <td>
                                <a target="_blank" href="https://assettocorsa.club/mods/tracks/suzuka-international-circuit.html">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">6/13</th>
                            <td>USA</td>
                            <td>
                                <a target="_blank" href="https://assettocorsa.club/mods/tracks/circuit-of-the-americas.html">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">6/20</th>
                            <td>Mexico</td>
                            <td>
                                <a target="_blank" href="https://assettomods.wixsite.com/assettomods/single-post/mexico">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">6/27</th>
                            <td>Brazil</td>
                            <td>
                                <a target="_blank" href="https://www.racedepartment.com/downloads/hd-track-update-series-sao-paulo-brazil.1259/">Download</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">7/4</th>
                            <td>Break</td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <th scope="row">7/10</th>
                            <td>Abu Dabi</td>
                            <td>
                                <a target="_blank" href="https://www.racedepartment.com/downloads/yas-marina-circuit.2696/">Download</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>


        </div>
    )
}

export default Schedule;