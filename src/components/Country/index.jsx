/* eslint-disable jsx-a11y/alt-text */
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
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
import MuiAlert from '@material-ui/lab/Alert';
import { Button, Col, Row, Statistic, Tooltip } from 'antd';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import covid19 from '../../assets/resources/covid-19.png';
import mask from '../../assets/resources/mask.png';
import stayHome from '../../assets/resources/stay-at-home.png';
import world from '../../assets/resources/world.png';
import { Countries } from '../../constants/countries';
import CovidContext from '../../context/covid19API/covidContext';
import Covid19Cart from '../Covid19Chart';
import RegressionModal from '../RegressionModal';
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  let regData = [];
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
    regData.push();
  }, [country]);

  const { Country, CountryCode, NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered, Date, Slug } = country;

  return (
    <>
      <RegressionModal isModalVisible={isModalVisible} handleCancel={() => setIsModalVisible(!isModalVisible)} data={allDataByCountry} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error">
          Lütfen Ülke seçiniz
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardHeader
          avatar={CountryCode ? <img src={`https://www.countryflags.io/${CountryCode}/shiny/64.png`} /> : <img className="w-header-icon" src={world}></img>}
          action={
            <>
              <Button style={{ marginTop: '25px' }} onClick={() => setIsModalVisible(!isModalVisible)} danger>
                Regresyon Analizi
              </Button>
              {'  '}
              <Button style={{ marginTop: '25px' }} onClick={() => setIsModalVisible(!isModalVisible)} type="primary">
                Eski veriler
              </Button>
            </>
          }
          title={<strong style={{ fontSize: '40px' }}>{Countries.some((x) => x.ISO2 === CountryCode) ? Countries.find((x) => x.ISO2 === CountryCode).country : Country ? Country : 'Dünya'} </strong>}
          subheader={Date}
        />

        <CardContent>
          <Row>
            <Col sm={12} className={classes.col}>
              <p className={classes.ColTitle}>Bugün</p>
              <div className={classes.paper}>
                <Paper elevation={3} style={{ background: `#cf1322` }}>
                  <Statistic className={classes.statistic} title={<h1 className={classes.statisticTitle}>Yeni Vaka Sayısı</h1>} value={NewConfirmed} precision={0} valueStyle={{ color: '#fff' }} prefix={NewConfirmed - NewRecovered < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />} />
                </Paper>
                <Paper elevation={3} style={{ background: `#3f8600` }}>
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
                <Paper elevation={3} style={{ background: `#cf1322` }}>
                  <Statistic className={classes.statistic} title={<h1 className={classes.statisticTitle}>Vaka Sayısı</h1>} value={TotalConfirmed} precision={0} valueStyle={{ color: '#fff' }} prefix={NewConfirmed - NewRecovered > 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />} />
                </Paper>
                <Paper elevation={3} style={{ background: `#3f8600` }}>
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
          <Tooltip placement="bottom" title={'Koronavirüs hastalığı (COVID-19).'}>
            <img className="w-icon" src={covid19}></img>
          </Tooltip>
          <Tooltip placement="bottom" title={'Sağlığınız için Evde Kalın. #StayHome'}>
            <img className="w-icon" src={stayHome}></img>
          </Tooltip>
          <Tooltip placement="bottom" title={'Maskesiz dışarı çıkmayın.'}>
            <img className="w-icon" src={mask}></img>
          </Tooltip>
          <Tooltip placement="left" title={'Ayrıntılı grafik için tıklayınız.'}>
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
          </Tooltip>
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
