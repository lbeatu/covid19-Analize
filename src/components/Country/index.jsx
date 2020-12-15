import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import MuiAlert from '@material-ui/lab/Alert';
import { Col, Row, Statistic } from 'antd';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { Countries } from '../../constants/countries';
import CovidContext from '../../context/covid19API/covidContext';
import Covid19Cart from '../Covid19Chart';
import { getData } from '../Covid19Chart/utils';
import './style.scss';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1000,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#111',
    paddingTop: '5px',
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
    backgroundColor: '#111',
    margin: '2px',
    borderRadius: '8px',
  },
  statistic: {
    marginTop: '15px',
    fontSize: '15px',
  },
  statisticTitle: {
    color: '#fff',
    fontSize: '18px',
  },
  col: {},
  ColTitle: {
    fontSize: '25px',
    fontWeight: 'bold',
    margin: 0,
  },
}));
export const Country = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [graphData, setGraphData] = useState(null);

  const handleExpandClick = () => {
    if (Slug) {
      setExpanded(!expanded);
    } else setOpen(!open);
  };
  const covidContext = useContext(CovidContext);
  const { country, getAllDataByCountry, allDataByCountry } = covidContext;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getAllDataByCountry(Slug);
  }, [country]);

  useEffect(() => {
    getData().then((data) => {
      console.log('🚀 ~ file: index.jsx ~ line 108 ~ getData ~ data', data);
      setGraphData(data);
    });
  }, []);

  const { Country, CountryCode, NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered, Date, Slug } = country;

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error">
          Lütfen Ülke seçiniz
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {CountryCode}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<strong style={{ fontSize: '40px' }}>{Countries.some((x) => x.ISO2 === CountryCode) ? Countries.find((x) => x.ISO2 === CountryCode).country : Country ? Country : 'Dünya'} </strong>}
          subheader={Date}
        />
        {console.log('country', allDataByCountry)}
        <CardContent>
          <Row>
            <Col sm={12} className={classes.col}>
              <p className={classes.ColTitle}>Bugün</p>
              <div className={classes.paper}>
                <Paper elevation={3} style={{ background: `${NewConfirmed - NewRecovered < 0 ? '#cf1322' : '#3f8600'}` }}>
                  <Statistic className={classes.statistic} title={<h1 className={classes.statisticTitle}>Yeni Vaka Sayısı</h1>} value={NewConfirmed} precision={0} valueStyle={{ color: '#fff' }} prefix={NewConfirmed - NewRecovered < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />} />
                </Paper>
                <Paper elevation={3} style={{ background: `${NewConfirmed - NewRecovered > 0 ? '#cf1322' : '#3f8600'}` }}>
                  <Statistic className={classes.statistic} title={<h1 className={classes.statisticTitle}>İyileşen Hasta Sayısı</h1>} value={NewRecovered} precision={0} valueStyle={{ color: '#fff' }} prefix={NewConfirmed - NewRecovered > 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />} />
                </Paper>
                <Paper elevation={3} style={{ background: `${'#212121'}` }}>
                  <Statistic className={classes.statistic} title={<h1 className={classes.statisticTitle}>Vefat Sayısı</h1>} value={NewDeaths} precision={0} valueStyle={{ color: '#fff' }} prefix={<ArrowUpOutlined />} />
                </Paper>
              </div>
            </Col>
            <Col sm={12} className={classes.col}>
              <p className={classes.ColTitle}>Toplam</p>
              <div className={classes.paper}>
                <Paper elevation={3} style={{ background: `${TotalConfirmed - TotalRecovered > 0 ? '#cf1322' : '#3f8600'}` }}>
                  <Statistic className={classes.statistic} title={<h1 className={classes.statisticTitle}>Vaka Sayısı</h1>} value={TotalConfirmed} precision={0} valueStyle={{ color: '#fff' }} prefix={NewConfirmed - NewRecovered > 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />} />
                </Paper>
                <Paper elevation={3} style={{ background: `${TotalConfirmed - TotalRecovered < 0 ? '#cf1322' : '#3f8600'}` }}>
                  <Statistic className={classes.statistic} title={<h1 className={classes.statisticTitle}>İyileşen Hasta Sayısı</h1>} value={TotalRecovered} precision={0} valueStyle={{ color: '#fff' }} prefix={NewConfirmed - NewRecovered > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} />
                </Paper>
                <Paper elevation={3} style={{ background: `${'#212121'}` }}>
                  <Statistic className={classes.statistic} title={<h1 className={classes.statisticTitle}>Vefat Sayısı</h1>} value={TotalDeaths} precision={0} valueStyle={{ color: '#fff' }} prefix={NewConfirmed - NewRecovered > 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />} />
                </Paper>
              </div>
            </Col>
          </Row>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div style={{ height: 500 }}> {allDataByCountry !== null && <Covid19Cart type="hybrid" data={allDataByCountry} />}</div>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
export default Country;
