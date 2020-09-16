import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core/';
import React, { Component } from 'react';

const styleSheet = {
  articleCard: {
    backgroundColor: "#F5F5F5", 
    marginTop: "20px!important", 
    width: "300px", 
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

    this.state = {
      title : props.title,
      body : props.body,
    }
  }

  render(){
    let classes = this.props.classes;
    return(
      <Card variant="outlined" className={classes.articleCard}>
        <CardContent>
          <Typography variant="h6" className={classes.articleTitle}>{this.state.title}</Typography>
          <Typography variant="body2" component="p">{this.state.body}</Typography>
        </CardContent>
      </Card>
    );
  }

} export default withStyles(styleSheet, { name: 'Article' })(Article);
