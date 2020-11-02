import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core/';
import React, { Component } from 'react';

const styleSheet = {
  articleCard: {
    backgroundColor: "#F5F5F5", 
    marginTop: "20px!important", 
    width: "95%",
    maxWidth: "300px",
    margin: "auto", 
    textAlign: "center", 
    borderRadius: 16
  },
  articleTitle:{
    fontWeight: "bold", 
    marginBottom: "5px",
  },
};

class Article extends Component {
  constructor(props, context){
    super(context);
    this.props = props;
  }

  render(){
    let classes = this.props.classes;
    return(
      <Card variant="outlined" className={classes.articleCard}>
        <CardContent>
          <Typography variant="h6" className={classes.articleTitle}>{this.props.title}</Typography>
          <Typography variant="body2" component="p">{this.props.body}</Typography>
        </CardContent>
      </Card>
    );
  }

} export default withStyles(styleSheet, { name: 'Article' })(Article);
