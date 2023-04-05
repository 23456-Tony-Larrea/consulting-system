import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Users from '../../views/app/admin/Users';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const NewMenu = () => {
  const [generalData, setGeneralData] = useState([]);

  const classes = useStyles();
  const Users = ({user}) => {
    return (
      <div>
  
             <p>{user.label}</p>
             <p>{user.to}</p>
      </div>
    );
  }
  const data = [
    {
      id: 'menu.search',
      icon: 'iconsminds-mail-search',
      label: 'GENERAL'
    },
    {
      id: 'menu.IESS',
      icon: 'iconsminds-mail-search',
      label: 'IESS',
      to: '/menuIess'
    },
    {
      id: 'menu.POLICIA',
      icon: 'iconsminds-user',
      label: 'POLICIA',
      to: '/menuPolices'
    },
    {
      id: 'menu.PROFESORES',
      icon: 'iconsminds-user',
      label: 'PROFESORES',
      to: '/menuTeacher'
    },
    {
      id: 'menu.DOCTORES',
      icon: 'iconsminds-user',
      label: 'DOCTORES',
      to: '/menuDoctors'
    },
    {
      id: 'menu.ASAMBLEA',
      icon: 'iconsminds-user',
      label: 'ASAMBLEA',
      to: '/menuAsamblea'
    },
     ];
  return (
    <div className={classes.root}>
      {data.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography className={classes.heading}>{item.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {
              item.id === 'menu.search'? <Users user={data}/>:null
              
                }
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
export default NewMenu;

