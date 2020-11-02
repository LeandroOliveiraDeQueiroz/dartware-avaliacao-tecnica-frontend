import { withStyles } from '@material-ui/core/styles';
import {Typography, Button, TextField, Divider, Grid, Snackbar, CircularProgress} from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, {useState, useEffect } from 'react';
import {SEED_API_URL} from '../constants';

import Article from "../components/Article";

const styleSheet = {
  button: {
    textTransform: "none",
    color: "#fff",
    width: "100%",
    maxWidth: "300px"
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
    maxWidth: "300px",
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
  loading:{
    width: "10%",
    marginTop: "30px",
  }
};

const Home = (props) => {
  const [updateArticleId, setUpdateArticleId] = useState("");
  const [updateArticleTitle, setUpdateArticleTitle] = useState("");
  const [updateArticleBody, setUpdateArticleBody] = useState("");
  const [searchArticleTitle, setSearchArticleTitle] = useState("");
  const [articles, setArticles] = useState([]);
  const [snackbar, setSnackbar] = useState({open: false, message: ""});
  const [loading, setLoading] = useState(true);

  const dividerOrientation = useMediaQuery('(min-width:600px)');

  useEffect(()=>{
    fetch(SEED_API_URL + "getArticle", {
      method: "GET", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((res)=>{
      if(res.status === 200){
        res.json().then((articles)=>{
          setArticles(articles);
          setLoading(false);
        }).catch((e)=>{
          console.log(e);
          setLoading(false);
        });
      } else {
        setArticles([]);
        setLoading(false);
      }
    }).catch((e)=>{
      console.log(e);
      setLoading(false);
    });
  }, []);

  const onCloseSnack = () => {
    setSnackbar({open: false, message: ""});
  }

  const changeArticle = () => {
    fetch(SEED_API_URL + "article/" + updateArticleId, {
      method: "PUT", 
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify({title: updateArticleTitle, body: updateArticleBody})
    }).then((res)=>{
      console.log(res);
      if(res.status === 200){
        setSnackbar({open: true, message: "Success"});
      } else {
        setSnackbar({open: true, message: "Error"});
      }
    }).catch((e)=>{
      console.log(e);
      setSnackbar({open: true, message: "Success"});
    });
  }

  const createRandomArticles = () => {
    setLoading(true);
    fetch(SEED_API_URL + "articles/random", {
      method: "POST", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((resp)=>{
      resp.json().then((body)=>{
        if(resp.status === 201){
          setArticles( (prvArticles) => [...prvArticles, ...body]);
          setSnackbar({open: true, message: "Success"});
          setLoading(false);
        } else{
          console.log(body);
          setSnackbar({open: true, message: "Error"});
          setLoading(false);
        }
      }).catch((e)=>{
        console.log(e);
        setSnackbar({open: true, message: "Error"});
        setLoading(false);
      });
    }).catch((e)=>{
      console.log(e);          
      setSnackbar({open: true, message: "Error"});
      setLoading(false);
    });
  }

  const deleteAll = () => {
    setLoading(true);
    fetch(SEED_API_URL + "articles/all", {
      method: "DELETE", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((res)=>{
      console.log(res);
      setArticles([]);
      setLoading(false);
      setSnackbar({open: true, message: "Success"})
    }).catch((e)=>{
      console.log(e);
      setLoading(false);
      setSnackbar({open: true, message: "Error"})
    });
  }

  const searchArticle = () => {
    setLoading(true);
    fetch(SEED_API_URL + "getArticle?title=" + searchArticleTitle, {
      method: "GET", 
      headers: {"Content-Type": "application/json; charset=utf-8"}
    }).then((res)=>{
      if(res.status === 200){
        res.json().then((articles)=>{
          setArticles(articles);
          setLoading(false);
          setSnackbar({open: true, message: "Success"});
        }).catch((e)=>{
          console.log(e);
          setLoading(false);
          setSnackbar({open: true, message: "Error"});
        });
      } else {
        setLoading(false);
        setSnackbar({open: true, message: "Not found"});
        setArticles([]);
      }
    }).catch((e)=>{
      console.log(e);
      setLoading(false);
      setSnackbar({open: true, message: "Error"});
    });
  }

  return(
    <div>
      <Grid container>
        <Grid id="Article-update" item xs={12} sm={5} style={{textAlign: "center"}}>
          <Typography variant="h5" style={{marginBottom: "20px", fontWeight: "bold"}}>Update Article</Typography>
          <div>
            <TextField
              label={"Article Id"}
              InputLabelProps={{classes: {root: props.classes.textFieldFont}}}
              value={updateArticleId}
              InputProps={{classes: { input: props.classes.textFieldFont}}}
              onChange={(evt) => setUpdateArticleId(evt.target.value)}
              variant="outlined"
              className={props.classes.textField}
              size="small"
            />
          </div>
          <div>
            <TextField
              label={"Title"}
              InputLabelProps={{classes: {root: props.classes.textFieldFont}}}
              value={updateArticleTitle}
              InputProps={{classes: { input: props.classes.textFieldFont}}}
              onChange={(evt) => setUpdateArticleTitle(evt.target.value)}
              variant="outlined"
              className={props.classes.textField}
              size="small"
            />
          </div>
          <div>
            <TextField
              label={"Body"}
              InputLabelProps={{classes: {root: props.classes.textFieldFont}}}
              value={updateArticleBody}
              InputProps={{classes: { input: props.classes.textFieldFont}}}
              onChange={(evt) => setUpdateArticleBody(evt.target.value)}
              variant="outlined"
              className={props.classes.textField}
              size="small"
            />
          </div>
          <Button 
            className={[props.classes.button, props.classes.yellowButton].join(" ")}
            size="small"
            onClick={changeArticle}
          >
            Update Article
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Divider orientation={dividerOrientation ? "vertical" : "horizontal"} 
          className={dividerOrientation ? props.classes.verticalDivider : props.classes.horizontalDivider}/>
        </Grid>
        <Grid item xs={12} sm={5} style={{textAlign: "center"}} id="Article-menu">
          <div>
            <Button 
              className={[props.classes.button, props.classes.blueButton].join(" ")} 
              size="small"
              onClick={createRandomArticles.bind(this)}
            >
              Create Random Articles &amp; Authors
            </Button>
          </div>
          <div>
            <Button 
              className={[props.classes.button, props.classes.redButton].join(" ")} 
              size="small"
              onClick={deleteAll.bind(this)}
            >
              Delete All Articles &amp; Authors
            </Button>
          </div>
          <div>
            <TextField
              label={"Search by Article Title..."}
              InputLabelProps={{classes: {root: props.classes.textFieldFont}}}
              value={searchArticleTitle}
              InputProps={{classes: { input: props.classes.textFieldFont}}}
              onChange={(evt) => setSearchArticleTitle(evt.target.value)}
              variant="outlined"
              className={props.classes.textField}
              size="small"
            />
          </div>
          <Button 
            className={[props.classes.button, props.classes.greenButton].join(" ")} 
            size="small"
            onClick={searchArticle.bind(this)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Divider className={props.classes.horizontalDivider}/>
      <div id="Article-search" style={{textAlign: "center"}}>
        <Typography style={{textAlign: "center", fontWeight: "bold"}} variant="h5">Search Results</Typography>
        { loading ? 
          <CircularProgress className={props.classes.loading}/>
        :
          articles && articles.length > 0 ?
            <Grid container>
              { 
                articles.map((article, i)=>{
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
        open={snackbar.open}
        onClose={onCloseSnack.bind(this)}
        autoHideDuration={500}
        message={<span>{snackbar.message}</span>}
      />
    </div>
  );
}

export default withStyles(styleSheet, { name: 'Home' })(Home);
