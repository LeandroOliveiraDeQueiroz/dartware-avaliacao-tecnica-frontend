import { withStyles } from '@material-ui/core/styles';
import {Typography, Button, TextField, Divider, Grid} from '@material-ui/core/';
import React, { Component } from 'react';
import {SEED_API_URL} from '../constants';

import Article from "../components/Article";

const styleSheet = {
  button: {
    textTransform: "none", 
    // borderRight: "1px "+muiTheme.palette.primary1Color, borderBottom: "1px "+muiTheme.palette.primary1Color, 
    // borderRadius: 0, 
    // borderStyle: "inset", height: "100%", fontSize: 18, whiteSpace: "nowrap", minWidth: "fit-content",
    // backgroundColor: '',
    color: "#fff",
    // width: "250px",
    width: "300px",
  },
  yellowButton:{
    backgroundColor: "#D6B656",
  },
  blueButton:{
    backgroundColor: "#0057D8",
    marginTop: "10px",
    marginBottom: "10px",
  },
  redButton:{
    backgroundColor: "#FF6666",
    marginBottom: "50px",
  },
  greenButton:{
    backgroundColor: "#82B366",
  },
  textField:{
    marginBottom: "10px",
    // width: "250px",
    width: "300px",
    backgroundColor: "#E9ECEF",
  },
  verticalDivider:{
    marginTop: "20px", 
    marginBottom: "20px",
    height: "2px",
    backgroundColor: "#BDBDBD",
  },
  textFieldFont:{
    fontSize: "15px"
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
    }
  }

  handleChangeUpdateArticle(field, value){
    this.state[field] = value;
    this.setState(this.state);
  }

  handleChangeSearchArticleTitle(value){
    this.state.searchArticleTitle = value;
    this.setState(this.state);
  }

  changeArticle(){
    fetch(SEED_API_URL + "article/" + this.state.updateArticleId, {
      method: "PUT", 
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify({title: this.state.updateArticleTitle, body: this.state.updateArticleBody})
    }).then((res)=>{
      console.log(res);
      // this.state.searchArticles = [];
      // this.setState(this.state);
    }).catch((e)=>{
      console.log(e);
    });
  }

  createRandomArticles(){
    fetch(SEED_API_URL + "articles/random", {
      method: "POST", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((resp)=>{
      resp.json().then((body)=>{
        if(resp.status == 201){
          this.state.searchArticles = body;
          this.setState(this.state);
        } else{
          console.log(body);
        }
      }).catch((e)=>{
        console.log(e);
      });
    }).catch((e)=>{
      console.log(e);
    });
  }
  //TODO Snackbar event
  deleteAll(){
    fetch(SEED_API_URL + "articles/all", {
      method: "DELETE", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((res)=>{
      console.log(res);
      this.state.searchArticles = [];
      this.setState(this.state);
    }).catch((e)=>{
      console.log(e);
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
                value={this.state.updateArticleId}
                label={this.state.updateArticleId ? "" : "Article Id"}
                InputLabelProps={{shrink: false}}
                onChange={(evt) => this.handleChangeUpdateArticle("updateArticleId", evt.target.value)}
                variant="outlined"
                className={classes.textField}
                size="small"
                InputProps={{
                  classes: {
                    input: classes.textFieldFont,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.textFieldFont,
                  },
                }}
              />
            </div>
            <div>
              <TextField
                value={this.state.updateArticleTitle}
                label={this.state.updateArticleTitle ? "" : "Title"}
                InputLabelProps={{shrink: false}}
                onChange={(evt) => this.handleChangeUpdateArticle("updateArticleTitle", evt.target.value)}
                variant="outlined"
                className={classes.textField}
                size="small"
                InputProps={{
                  classes: {
                    input: classes.textFieldFont,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.textFieldFont,
                  },
                }}
              />
            </div>
            <div>
              <TextField
                value={this.state.updateArticleBody}
                label={this.state.updateArticleBody ? "" : "Body"}
                InputLabelProps={{shrink: false}}
                onChange={(evt) => this.handleChangeUpdateArticle("updateArticleBody", evt.target.value)}
                variant="outlined"
                className={classes.textField}
                size="small"
                InputProps={{
                  classes: {
                    input: classes.textFieldFont,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.textFieldFont,
                  },
                }}
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
            { window.innerWidth >= 600 ?
              <Divider orientation={"vertical"} style={{margin: "auto", width: "2px", backgroundColor: "#BDBDBD"}}/>
            :
              <Divider orientation={"horizontal"} className={classes.verticalDivider}/>
            }
          </Grid>
          <Grid item xs={12} sm={5} style={{textAlign: "center",
          //  marginTop: window.innerWidth > 500 ? "10px" : "40px"
          }} id="Article-menu">
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
                value={this.state.searchArticleTitle}
                label={this.state.searchArticleTitle ? "" : "Search by Article Title..."}
                InputLabelProps={{shrink: false}}
                onChange={(evt) => this.handleChangeSearchArticleTitle(evt.target.value)}
                variant="outlined"
                className={classes.textField}
                size="small"
                InputProps={{
                  classes: {
                    input: classes.textFieldFont,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.textFieldFont,
                  },
                }}
              />
            </div>
            <Button className={[classes.button, classes.greenButton].join(" ")} size="small">Search</Button>
          </Grid>
        </Grid>
        <Divider className={classes.verticalDivider}/>
        <div id="Article-search">
          <Typography style={{textAlign: "center", fontWeight: "bold"}} variant="h5">Search Results</Typography>
          { this.state.searchArticles && this.state.searchArticles.length > 0 ?
            <Grid container>
              { 
                this.state.searchArticles.map((article)=>{
                  return(
                    <Grid item xs={12} sm={6}>
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

      </div>
    );
  }

} export default withStyles(styleSheet, { name: 'Home' })(Home);
