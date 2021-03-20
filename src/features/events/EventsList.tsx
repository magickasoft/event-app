import React from 'react';
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import EventItem from 'components/EventItem';

import './Eventlist.css';

function EventsList() {
  return (
    <Grid
      // @ts-ignore
      className="grid"
      as="div"
      largeDesktop={{
        columns: 'repeat(4, minmax(10px, 1fr))',
        gap: '15px',
      }}
      desktop={{
        columns: 'repeat(3, minmax(10px, 1fr))',
        gap: '15px',
      }}
      largeMobile={{
        columns: 'repeat(2, minmax(10px, 1fr))',
        gap: '15px',
      }}
      maxWidth="1440px"
      mediumMobile={{
        columns: 'repeat(1, minmax(10px, 1fr))',
        gap: '15px',
      }}>
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
    </Grid>
  );
}

export default EventsList;
