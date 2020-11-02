import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core/';
import React  from 'react';

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

const Article = (props) => {
  return(
    <Card variant="outlined" className={props.classes.articleCard}>
      <CardContent>
        <Typography variant="h6" className={props.classes.articleTitle}>{props.title}</Typography>
        <Typography variant="body2" component="p">{props.body}</Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styleSheet, { name: 'Article' })(Article);
