import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const FeatureCard = props => (
  <Card style={{'marginBottom' : '50px', }}>
    <CardHeader
      title={props.title}
      subtitle={props.subtitle}
      style={{
        'paddingLeft': '90px',
   }}
    />
    <CardText>
   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
   Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
   Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
   Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
   Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
   Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
   Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
   </CardText>
   {props.action ? (
     <CardActions>
     <FlatButton label="Try yourself" primary={true}/>
     </CardActions>)
     :
     ''}
  </Card>
);

export default FeatureCard;
