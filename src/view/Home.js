import { withStyles } from '@material-ui/core/styles';
import {Typography, Button, TextField, Divider, Grid, Snackbar} from '@material-ui/core/';
import React, { Component } from 'react';
import {SEED_API_URL} from '../constants';

import Article from "../components/Article";

const styleSheet = {
  button: {
    textTransform: "none",
    color: "#fff",
    width: "100%",
  },
  yellowButton:{
    backgroundColor: "#D6B656",
    '&:hover': {
      backgroundColor: "#D6B656",
    }
  },
  blueButton:{
    backgroundColor: "#0057D8",
    marginTop: "10px",
    marginBottom: "10px",
    '&:hover': {
      backgroundColor: "#0057D8",
    }
  },
  redButton:{
    backgroundColor: "#FF6666",
    marginBottom: "68px",
    '&:hover': {
      backgroundColor: "#FF6666",
    }
  },
  greenButton:{
    backgroundColor: "#82B366",
    '&:hover': {
      backgroundColor: "#82B366",
    }
  },
  textField:{
    marginBottom: "10px",
    width: "100%",
    backgroundColor: "#E9ECEF",
  },
  horizontalDivider:{
    marginTop: "20px", 
    marginBottom: "20px",
    height: "2px",
    backgroundColor: "#BDBDBD",
  },
  textFieldFont:{
    fontSize: "15px"
  },
  verticalDivider:{
    margin: "auto", 
    width: "2px", 
    backgroundColor: "#BDBDBD"
  },
};

class Home extends Component {
  constructor(props, context){
    super(context);
    this.props = props;

    this.state = {
      updateArticleId : "",
      updateArticleTitle : "",
      updateArticleBody : "",
      searchArticleTitle : "",
      searchArticles: [],
      snackMessage: "",
      openSnack: false,
    }
  }

  handleChangeUpdateArticle(field, value){
    this.setState({[field]: value});
  }

  handleChangeSearchArticleTitle(value){
    this.setState({searchArticleTitle: value});
  }

  onCloseSnack() {
    this.setState({openSnack: false});
  }

  changeArticle(){
    fetch(SEED_API_URL + "article/" + this.state.updateArticleId, {
      method: "PUT", 
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify({title: this.state.updateArticleTitle, body: this.state.updateArticleBody})
    }).then((res)=>{
      console.log(res);
      if(res.status === 200){
        this.setState({openSnack: true, snackMessage: "Success"});
      } else {
        this.setState({openSnack: true, snackMessage: "Error"});
      }
    }).catch((e)=>{
      console.log(e);
      this.setState({openSnack: true, snackMessage: "Error"});
    });
  }

  createRandomArticles(){
    fetch(SEED_API_URL + "articles/random", {
      method: "POST", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((resp)=>{
      resp.json().then((body)=>{
        if(resp.status === 201){
          this.setState({searchArticles: body, openSnack: true, snackMessage: "Success"});
        } else{
          console.log(body);
          this.setState({openSnack: true, snackMessage: "Error"});
        }
      }).catch((e)=>{
        console.log(e);
        this.setState({openSnack: true, snackMessage: "Error"});
      });
    }).catch((e)=>{
      console.log(e);
      this.setState({openSnack: true, snackMessage: "Error"});
    });
  }

  deleteAll(){
    fetch(SEED_API_URL + "articles/all", {
      method: "DELETE", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((res)=>{
      console.log(res);
      this.setState({searchArticles: [], openSnack: true, snackMessage: "Success"});
    }).catch((e)=>{
      console.log(e);
      this.setState({openSnack: true, snackMessage: "Error"});
    });
  }

  searchArticle(){
    fetch(SEED_API_URL + "getArticle?title=" + this.state.searchArticleTitle, {
      method: "GET", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((res)=>{
      if(res.status === 200){
        res.json().then((articles)=>{
          this.setState({searchArticles: articles, openSnack: true, snackMessage: "Success"});
        }).catch((e)=>{
          console.log(e);
          this.setState({openSnack: true, snackMessage: "Error"});
        });
      } else {
        this.setState({searchArticles: [], openSnack: true, snackMessage: "Not found"});
      }
    }).catch((e)=>{
      console.log(e);
      this.setState({openSnack: true, snackMessage: "Error"});
    });
  }

  componentDidMount(){
    this.changeStateFn = this.setState.bind(this);
    window.addEventListener("resize", this.changeStateFn);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.changeStateFn);
  }

  render(){
    let classes = this.props.classes;
    return(
      <div>
        <Grid container>
          <Grid id="Article-update" item xs={12} sm={5} style={{textAlign: "center"}}>
            <Typography variant="h5" style={{marginBottom: "20px", fontWeight: "bold"}}>Update Article</Typography>
            <div>
              <TextField
                label={"Article Id"}
                InputLabelProps={{classes: {root: classes.textFieldFont}}}
                value={this.state.updateArticleId}
                InputProps={{classes: { input: classes.textFieldFont}}}
                onChange={(evt) => this.handleChangeUpdateArticle("updateArticleId", evt.target.value)}
                variant="outlined"
                className={classes.textField}
                size="small"
              />
            </div>
            <div>
              <TextField
                label={"Title"}
                InputLabelProps={{classes: {root: classes.textFieldFont}}}
                value={this.state.updateArticleTitle}
                InputProps={{classes: { input: classes.textFieldFont}}}
                onChange={(evt) => this.handleChangeUpdateArticle("updateArticleTitle", evt.target.value)}
                variant="outlined"
                className={classes.textField}
                size="small"
              />
            </div>
            <div>
              <TextField
                label={"Body"}
                InputLabelProps={{classes: {root: classes.textFieldFont}}}
                value={this.state.updateArticleBody}
                InputProps={{classes: { input: classes.textFieldFont}}}
                onChange={(evt) => this.handleChangeUpdateArticle("updateArticleBody", evt.target.value)}
                variant="outlined"
                className={classes.textField}
                size="small"
              />
            </div>
            <Button 
              className={[classes.button, classes.yellowButton].join(" ")}
              size="small"
              onClick={this.changeArticle.bind(this)}
            >
              Update Article
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Divider orientation={window.innerWidth >= 600 ? "vertical" : "horizontal"} 
            className={window.innerWidth >= 600 ? classes.verticalDivider : classes.horizontalDivider}/>
          </Grid>
          <Grid item xs={12} sm={5} style={{textAlign: "center"}} id="Article-menu">
            <div>
              <Button 
                className={[classes.button, classes.blueButton].join(" ")} 
                size="small"
                onClick={this.createRandomArticles.bind(this)}
              >
                Create Random Articles &amp; Authors
              </Button>
            </div>
            <div>
              <Button 
                className={[classes.button, classes.redButton].join(" ")} 
                size="small"
                onClick={this.deleteAll.bind(this)}
              >
                Delete All Articles &amp; Authors
              </Button>
            </div>
            <div>
              <TextField
                label={"Search by Article Title..."}
                InputLabelProps={{classes: {root: classes.textFieldFont}}}
                value={this.state.searchArticleTitle}
                InputProps={{classes: { input: classes.textFieldFont}}}
                onChange={(evt) => this.handleChangeSearchArticleTitle(evt.target.value)}
                variant="outlined"
                className={classes.textField}
                size="small"
              />
            </div>
            <Button 
              className={[classes.button, classes.greenButton].join(" ")} 
              size="small"
              onClick={this.searchArticle.bind(this)}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Divider className={classes.horizontalDivider}/>
        <div id="Article-search">
          <Typography style={{textAlign: "center", fontWeight: "bold"}} variant="h5">Search Results</Typography>
          { this.state.searchArticles && this.state.searchArticles.length > 0 ?
            <Grid container>
              { 
                this.state.searchArticles.map((article, i)=>{
                  return(
                    <Grid item xs={12} sm={6} key={i}>
                      <Article title={article.title} body={article.body}></Article>
                    </Grid>
                  )
                })
              }
            </Grid>
          :
            ""
          }
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.openSnack}
          onClose={this.onCloseSnack.bind(this)}
          autoHideDuration={500}
          message={<span>{this.state.snackMessage}</span>}
        />
      </div>
    );
  }

} export default withStyles(styleSheet, { name: 'Home' })(Home);
