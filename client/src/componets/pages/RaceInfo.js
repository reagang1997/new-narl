import React from 'react';
import CurrentTrack from '../CurrentTrack';
import CurrentGrid from '../CurrentGrid';
import { Card, Col, Row } from 'react-bootstrap';
import NewsFeed from '../NewsFeed';

const RaceInfo = () => {
  return (

    <div className="col-md-12 f1">
      <div>
        <div body className='' style={{ width: '1250px', margin: 'auto',  marginTop: '25px' }}>
          <h1 id='white' style={{ width: 'fit-content', margin: 'auto', fontSize: '60px', borderBottom: '2px solid rgb(255, 230, 0)' }}>Round 17</h1>
          <Row>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <CurrentTrack />

                </Col>
              </Row>
            </Col>
            <Col md={6}>
              {/* <NewsFeed/> */}
              <CurrentGrid />

            </Col>
          </Row>
        </div>
      </div>
        <div>
        </div>


      </div>
  )
}

export default RaceInfo;