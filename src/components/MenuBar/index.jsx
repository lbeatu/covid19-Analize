import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    background: '#ff9f1a',
  },
  title: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  aboutButton: {
    color: ' #fff',
    padding: '10px',
    paddingLeft: '10px',
  },
  afisButton: {
    color: ' #fff',
    padding: '8px',
    paddingLeft: '10px',
    fontWeight: '500',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    float: 'left',
  },
}));

export const MenuBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className={classes.link} to="/">
              <span className="menubar_title">Covid19 Güncel İstatistik Ve Analiz Portalı</span>
            </Link>
          </Typography>
          <Button href="corona-help" color="primary" className={classes.afisButton}>
            Yeni Koronavirüs Riskine Karşı 14 Kural
          </Button>
          <Button href="corona-help-home" color="primary" className={classes.afisButton}>
            Evde İzleme (Karantina) Kuralları - 14 Gün Kuralı
          </Button>
          <Button href="about" color="secondary" className={classes.aboutButton}>
            Hakkında
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
