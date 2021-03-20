import React from 'react';
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import EventItem from 'components/EventItem';
import {events} from './events_mock';
import './Eventlist.css';

function EventsList() {
  const renderEvent = (props: any) => <EventItem {...props} />;
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
      {events.map(renderEvent)}
    </Grid>
  );
}

export default EventsList;
