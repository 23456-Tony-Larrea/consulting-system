import React ,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from 'containers/navs/Topnav';
import Sidebar from 'containers/navs/Sidebar';
import {Button, Input,InputGroup, Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,} from 'reactstrap';
import axios from '../../../api/axios';
import Users from '../admin/Users';
import { ToastContainer, toast } from 'react-toastify';
import { SpinnerCircular } from 'spinners-react';
import Swal from 'sweetalert2';
import { ScaleLoader } from 'react-spinners';
import'react-circular-progressbar/dist/styles.css';
import { Accordion, AccordionSummary, AccordionDetails,Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import UserIess from './UserIess';
import UsersPolicia from './UserPolices';
import UsersTeachers from './UserTeachers';
import UserDoctors from './UserDoctors';
import AsambleistasUsers from './AsambleistasUsers';
import UsersHandicapped from './UserHandicapped'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { Card ,CardBody,CardText} from 'reactstrap';
import  image from '../../../assets/img/3997635.png';
import photoNf from '../../../assets/img/149071.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import Modal from 'react-modal';
import PDFViewer from 'react-pdf-js'
import Footer from 'containers/navs/Footer';
import jwt from 'jsonwebtoken';
import { logoutUser } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import Tree from 'react-d3-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faArrowCircleLeft,
  faArrowCircleRight,
  faBuildingShield,
  faCamera,
  faChalkboardTeacher,
  faFileLines,
  faFolder,
  faFolderTree,
  faPassport,
  faSearch,
  faUserDoctor,
  faUsersBetweenLines,
} from '@fortawesome/free-solid-svg-icons';
import s from '../../../../src/module.css/admin.module.css';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  quillContainer: {
    width: '100%',
    height: '350px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#005DA2',
    fontWeight: 'bold',
  },
}));



const AppLayout = ({ containerClassnames, history,props}) => {
  const classes = useStyles();
    const token = localStorage.getItem('token');

    axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${token}`;
                const decoded = jwt.decode(token);
                
                if (decoded && decoded.exp && decoded.exp < Date.now() / 1000) {
                  localStorage.removeItem('token');
                  dispatch(logoutUser());
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Tu sesion a expirado!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      history.push('/');
                      window.location.reload();
                    }
                  });
                }
                return config;
            },
            error => {
              if(error.response.status === 401){
                localStorage.removeItem('token');
                dispatch(logoutUser());
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: '¡Su sesión ha expirado!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Ok',
                }).then((result) => {
                  if (result.isConfirmed) {
                history.push('/');
                window.location.reload();
                  }
                })
                return Promise.reject(error);
             }
            }	
    )
    const data = [
      {
        id: 'menu.search',
        icon: 'iconsminds-mail-search',
        label: 'Registro Civil'
      },
      {
        id: 'menu.IESS',
        label: 'IESS',
        to: '/menuIess'
      },
      {
        id: 'menu.POLICIA',
        label: 'Policía',
        to: '/menuPolices'
      },
      {
        id: 'menu.PROFESORES',
        label: 'Profesores',
        to: '/menuTeacher'
      },
      {
        id: 'menu.DOCTORES',
        label: 'Doctores',
        to: '/menuDoctors'
      },
      {
        id: 'menu.CONADIS',
        label: 'CONADIS',
        to: '/menuHandicapped'
      },
      {
        id: 'menu.ASAMBLEA',
        label:'Asamblea',
        to: '/menuAsamblea'
      },
      {
        id:'menu.Documentos',
        label:'Documentos',
      },
      {
        id:'menu.Foto',
        label:'Historial de Foto del Ciudadano',
      },
      {
        id:'menu.Notas',
        label: 'Notas',
      },
      {	
        id:'menu.Arbol',
        label: 'Arbol Genealógico'
        },
       ];

    const [dataUsers,setDataUsers] = useState([]);
    const [dataMother,setDataMother]= useState([]);
    const [dataFather,setDataFather]= useState([]);
    const [dataNameUser,setDataNameFather]=useState([]);
    const [dataNameMother,setDataNameMother]=useState([]);
    const [value, setValue] = useState("");
    const [loading,setLoading] = useState(false);
    const [loading2,setLoading2] = useState(true);
    const [isDisabled,setIsDisabled] = useState(false);
    const [buttonDisabled,setButtonDisabled] = useState(true);
    const [dataIess,setDataIess] = useState([]);
    const [dataPolicia,setDataPolicia] = useState([]);
    const [dataTeacher,setDataTeacher] = useState([]);
    const [dataDoctor,setDataDoctor] = useState([]);
    const [dataAsamblea,setDataAsamblea] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [loadButton, setLoadButton] = useState(false);
    const [consultaRealizada, setConsultaRealizada] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [identity, setIdentity] = useState('');
    const [pdf, setPdf] = useState(null);
    const [photo,setPhoto]=useState(null);
    const [text, setText] = useState('');
    const [showModal, setShowModal] =useState(false);
    const [showModal2, setShowModal2] =useState(false);
    const [showModal3, setShowModal3] =useState(false);
    const [showModal4, setShowModal4] =useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [errorMesages, setErrorMesages] = useState('');
    const [wordLetter ,setLetterCount] = useState(0);
    const [dataDocument, setDataDocument] = useState([]);
    const [dataPhoto, setDataPhoto] = useState([]);
    const [dataNotes, setDataNotes] = useState([]);
    const wordLimit = 300;
    const [dataIessButton, setDataIessButton] = useState([]);
    const [dataPolicesButton, setDataPolicesButton] = useState([]);
    const [dataTeacherButton, setDataTeacherButton] = useState([]);
    const [dataDoctorButton, setDataDoctorButton] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isActive,setIsActive] = useState(false);
    const [orgChart, setOrgChart] = useState({});
    const [dataThree,setDataThree] = useState([]);
    const [seeDataThree,setSeeDataThree]=useState([]);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [showNewQueryButton, setShowNewQueryButton] = useState(false);
      const [next, setNext] = useState(6);
  const [prev, setPrev] = useState(0);
  const [dataConadis,setDataConadis] =useState([]);
  

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const actionsDropdownName = () => {
      history.push('/menuName');
      
      }
    const dispatch = useDispatch();


    const countLetters = (text) => {
      return text.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim().length;
  }

  const handleKeyPress = (e) => {
    if (countLetters(text) >= wordLimit && e.which !== 8) {
      e.preventDefault();
      toast.error(`Solo se permiten ${wordLimit} palabras`);
    }

};
const paginacionNext = () => {
  if (prev < dataNotes.length - 6)
    return setNext(next + 6), setPrev(prev + 6);
};
const paginacionPrev = () => {
  if (next > dataNotes.length - 6)
    return setNext(next - 6), setPrev(prev - 6);
};
let exp = 0;

      useEffect(() => {
        const decoded = jwt.decode(token);
        if (decoded && decoded.exp) {
          exp = decoded.exp;
        
        if (exp *1000 < Date.now() ) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tu sesion ha expirado!'
          });
        }
      }
       if (!token) {
        history.push('/');
        window.location.reload();
        }
      setTimeout(() => {
        setLoading2(false);
        setLoaded(true);
      },1800,[token,dispatch]);
      const interval = setInterval(() => {
        setLetterCount(countLetters(text));
        setButtonDisabled(text==="" || wordLetter > wordLimit);
      }, 500);
      const fetchData = async () => {
        let resultDocumentos = await axios.get(`api/listpdf/${value}`);
        setDataDocument(resultDocumentos.data);
      };
      fetchData();
      const dataPhoto= async()=>{
        let resultPhoto = await axios.get(`api/listimg/${value}`);
        setDataPhoto(resultPhoto.data);  
      }
      dataPhoto();
        return () => clearInterval(interval);
    },[text,wordLimit,pdf]);  
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['clean']
      ],
    };

  const handleValidation = (value) => {
if(value.length!==10){
  setErrorMesages('El numero de cédula debe tener 10 dígitos');
  setDataAsamblea([]);
  setDataDoctor([]);
  setDataIess([]);
  setDataPolicia([]);
  setDataTeacher([]);
  setDataUsers([]);
  setConsultaRealizada(false);
  setShowButton(false);
  setLoadButton(false);
  setPdf(null);
  setDataDocument([]);
  setText('');
  setPdfUrl('');
  
}else{
    setErrorMesages('');
    setInputDisabled(true);
    setShowNewQueryButton(true);
}
  }
 const convertGender=(gender)=>{
  if (gender === "MALE") {
    return "Masculino";
  } else if (gender === "FEMALE") {
    return "Femenino";
  }
 }
 
const handleNewQuery = () => {
  Swal.fire({
    title:'¿Seguro que quieres realizar una nueva consulta?',
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Realizar una nueva consulta',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
}

  const clearData=()=>{
    setDataAsamblea([]);
    setDataDoctor([]);
    setDataIess([]);
    setDataPolicia([]);
    setDataTeacher([]);
    setDataUsers([]);
    setConsultaRealizada(false);
    setShowButton(false);
    setLoadButton(false);
    setPdf(null);
    setDataDocument([]);
    setText('');
    setPdfUrl('');
    setPhotoUrl('');
  }
    const handleChange = async (e) => {
      
      if(e.target.value.length===''){
        clearData();
        if(source){
          source.cancel();
        }
      }
        handleValidation(e.target.value);
        setValue(e.target.value);
        setIdentity(e.target.value);
        const value= e.target.value.replace(/[^0-9]/ig, '');
        if(value.length ==10){
          setIsDisabled(false);
          var region_digit = value.substring(0,2);
          if(region_digit>=1 && region_digit<=24){
           
            console.log('la cedula es valida')

            
            var last_digit = value.substring(9,10);
            var par=parseInt(value.substring(1,2))+parseInt(value.substring(3,4))+parseInt(value.substring(5,6))+parseInt(value.substring(7,8));
            var num1=value.substring(0,1);
            var num1=num1*2;
            if(num1>9){ num1=num1-9; }

            var num3=value.substring(2,3);
            var num3=num3*2;
            if(num3>9){ num3=num3-9; }
            
            var num5=value.substring(4,5);
            var num5=num5*2;
            if(num5>9){ num5=num5-9; }

            var num7=value.substring(6,7);
            var num7=num7*2;
            if(num7>9){ num7=num7-9; }

            var num9=value.substring(8,9);
            var num9=num9*2;
            if(num9>9){ num9=num9-9; }

            var imp=parseInt(num1)+parseInt(num3)+parseInt(num5)+parseInt(num7)+parseInt(num9);
            var all_suma=parseInt(par)+parseInt(imp);

            var first_digit_sum=String(all_suma).substring(0,1);
            var docena=(parseInt(first_digit_sum)+1)*10;
            var validator_digit=docena-all_suma;
            if(validator_digit==10){ validator_digit=0; }
            if(validator_digit==last_digit){
              toast.success('La cédula es válida');
              setConsultaRealizada(true);
              setShowButton(true);
              clearData();
          }else{
            Swal.fire({
              title: '¡Error!',
              text: '¡La cédula no es válida!',
              icon: 'error',
              confirmButtonText: 'Ok' ,
              confirmButtonColor: '#3085d6'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
  

        }else{
          toast.error('Esta cédula no pertenece a ninguna región');
        }
        }else{
          if(value.length ===11){
          Swal.fire({
            title: '¡Error!',
            text: '¡Escribe bien la cédula!',
            icon: 'Warning',
            confirmButtonText: 'Ok' ,
            confirmButtonColor: '#3085d6'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
          }

        }
        console.log(value);
        setLoading(true);
      
    }
    const handlePdfChange = (event) => {
      setPdf(event.target.files[0]);
    }
    const handlePhotoChange = (event) => {
      setPhoto(event.target.files[0]);
    }
    
      const handleSubmitPhoto =async ()=>{
        if(!photo){
          Swal.fire({
            title: '¡Error!',
            text: '¡Debes seleccionar una foto!',
            icon: 'error',
            confirmButtonText: 'Ok' ,
            confirmButtonColor: '#3085d6'
          })
          return;
        }
        try{
          const formData2 = new FormData();
          formData2.append('img_path', photo)
          formData2.append('identity', identity);
          await axios.post('/api/img',formData2,{
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          }).then((response)=>{
            console.log(response.data);
            setPhoto(null);
            Swal.fire({
              title: '¡Éxito!',
              text: '¡Foto subida con éxito!',
              icon: 'success',
              confirmButtonText: 'Ok' ,
              confirmButtonColor: '#3085d6',
              timer: 1500
          })
          })
        }
        catch(error){
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: '¡No se pudo guardar el archivo!',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6',
            timer: 1500
            });
        }
        }

    const handleSubmit = async () => {
      if(!pdf){
        Swal.fire({
          title: '¡Error!',
          text: '¡Debes seleccionar un archivo!',
          icon: 'error',
          confirmButtonText: 'Ok' ,
          confirmButtonColor: '#3085d6'
        })
        return;
      }
      try {
        const formData = new FormData();
        formData.append('pdf_path', pdf);
        formData.append('identity', identity);
        
        await axios.post('/api/pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          console.log(response.data);
          setPdf(null);
          Swal.fire({
            title: '¡Exito!',
            text: '¡Se guardo el archivo!',
            icon:'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6',
            timer: 1500
          });
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: '¡No se pudo guardar el archivo!',
          icon: 'error',
          confirmButtonText: 'Ok',
          timer: 1500,
          confirmButtonColor: '#3085d6'
          });
      }
    }

    const handleOpenModal2 = async ()=>{
      console.log(identity);
      setLoading(true);
      try {
        const response = await axios.get(`/api/listObservation/${value}`);
        setDataNotes(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      setShowModal2(true);
    }
    const handleOpenModal = (document) => {
      let url = `http://192.168.1.186:8001/${document.pdf_path}`;
       console.log(url);
       window.open(url, '_blank');
      };
      const handleOpenModal3 = async (photo) => {
        let urlPhoto = `http://192.168.1.186:8001/${photo.img_path}`;
        setShowModal3(true)
          setPhotoUrl(urlPhoto)
      }
    const handleOpenModal4 = async () => {
      try {
        const response = await axios.get(`/api/citizen/${value}`);
        setDataMother(response.data[0].identity_madre);
        setDataFather(response.data[0].identity_padre);
        setDataNameMother(response.data[0].nombre_madre);
        setDataNameFather(response.data[0].nombre_padre);
        
        console.log(response.data);

      setShowModal4(true)

    }catch (e){
      console.log(e);
    }
    }
    const updateIdentityFaherAndMother = async () => {
      console.log(dataFather);
      console.log(dataMother);
    
      try {
        const response = await axios.post(`/api/editFamily/${value}`, {
          identity_mother: dataFather,
          identity_father: dataMother
        });
        console.log(response.status);
        if (response.status === 200) {
          Swal.fire({
            title: '¡Éxito!',
            text: '¡Se actualizo la información!',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 1500,
            confirmButtonColor: '#3085d6'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al actualizar la información',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6'
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseModal2 = () => setShowModal2(false);
    const handleCloseModal3 = () => setShowModal3(false);
    const handleCloseModal4 = () => setShowModal4(false);
    
    const handleMenuClick= async (item) => {
    if(!`${value}`){
      Swal.fire({
        title: '¡Error!',
        text: '¡Escribe la cédula :D!',
        icon: 'warning',
        confirmButtonText: 'Ok' ,
        confirmButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    }else{
    let results;
    if(item.id === 'menu.search'){
      results = await axios.get(`/api/citizen/${value}`);

      console.log(results);
      setDataUsers(results.data);
      setLoading(true);
      setLoadButton(true);
    }else if(item.id === 'menu.IESS'){
      let resultIess;
      resultIess = await axios.get(`/api/iess/${value}`);
      setDataIess(resultIess.data);
      if (resultIess.data && resultIess.data.length > 0 && resultIess.data[0].parroquia_iess) {
        setDataIessButton(resultIess.data[0].parroquia_iess);
    } else {
        setDataIessButton(undefined); // o establecer un valor predeterminado
        setLoading(false);
    }
    }else if(item.id === 'menu.POLICIA'){
      let resultPolicia;
      resultPolicia = await axios.get(`/api/polices/${value}`);
      setDataPolicia(resultPolicia.data);
      setLoading(true);
      if (resultPolicia.data && resultPolicia.data.length > 0 && resultPolicia.data[0].institucion) {
        setDataPolicesButton(resultPolicia.data[0].institucion);
    } else {
        setDataPolicesButton(undefined); // o establecer un valor predeterminado
        setLoading(false);
    } 
    }else if(item.id === 'menu.PROFESORES'){
      let resultTeacher;
      resultTeacher = await axios.get(`/api/teacher/${value}`);
      setDataTeacher(resultTeacher.data);
      setLoading(true);
      if (resultTeacher.data && resultTeacher.data.length > 0 && resultTeacher.data[0].distrito_educativo) {
        setDataTeacherButton(resultTeacher.data[0].distrito_educativo);
    } else {
        setDataTeacherButton(undefined); // o establecer un valor predeterminado
        setLoading(false);
    }
      
    } else if(item.id === 'menu.DOCTORES'){
      let resultDoctor;
      resultDoctor = await axios.get(`/api/doctors/${value}`);
      console.log(resultDoctor.data[0].genero_doctor);
      setDataDoctor(resultDoctor.data);
      setLoading(true);
      if (resultDoctor.data && resultDoctor.data.length > 0 && resultDoctor.data[0].genero_doctor) {
        setDataDoctorButton(resultDoctor.data[0].genero_doctor);
    } else {
      setDataDoctorButton(undefined); // o establecer un valor predeterminado
        setLoading(false);
    }
    }else if (item.id === 'menu.CONADIS'){
      
      axios.get(`http://192.168.1.36:4003/conadies/${value}`)
      .then((response) => {
        console.log(response.data.data[0].id);
       setDataConadis(response.data.data);
       setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
      }
    else if(item.id==='menu.ASAMBLEA'){
      let resultAsamblea;
      resultAsamblea = await axios.get(`/api/asambleistas/${value}`);
      console.log(resultAsamblea);
      setDataAsamblea(resultAsamblea.data);
      setLoading(true);
     
    } else if (item.id==='menu.Documentos'){
      let resultDocumentos;
      resultDocumentos = await axios.get(`/api/listpdf/${value}`);
      console.log(resultDocumentos);
      setDataDocument(resultDocumentos.data);
      setLoading(true);
  }else if (item.id==='menu.Arbol'){
    let children = [];
    let resultThree;
    resultThree = await axios.get(`/api/familyTree/${value}`);
    for (let i = 1; i < resultThree.data.length; i++) {
      let child = resultThree.data[i];
      let childObject = {
        name: `Hijo ${i + 0}`,
        attributes: {
          Nombres: child.names || 'No hay resultados',
          Apellidos: child.lastnames || 'No hay resultados',
          Cedula: child.identity || 'No hay resultados',
        },
      };
      children.push(childObject);
    }
    if (!resultThree.data[0].nombre_madre && !resultThree.data[0].nombre_padre) {
      setSeeDataThree([]);
      setLoading(false);
      console.log('No hay resultados');
      return;
    }
    setDataThree(resultThree.data);
    setLoading(true);
    console.log(resultThree)
    setSeeDataThree(resultThree.data[0].nombre_madre)
    setOrgChart({
      name: 'Familiares',
      children: [
        {
          name: 'Padre',
          attributes: {
            Nombres: resultThree.data[0].nombre_padre || 'No hay resultados',
            Apellidos:resultThree.data[0].apellido_padre || 'No hay resultados',
            Cedula: resultThree.data[0].ced_padre || 'No hay resultados',
          },
        },
        {
          name: 'Madre',
          attributes: {
            Nombres: resultThree.data[0].nombre_madre  || 'No hay resultados',
            Apellidos:resultThree.data[0].apellido_madre || 'No hay resultados',
            Cedula: resultThree.data[0].ced_madre || 'No hay resultados',
          },
        },
        {
          name:'Cónyuge',
          attributes:{
            Nombres: resultThree.data[0].nombre_conyuge || 'No hay resultados',
            Apellidos:resultThree.data[0].apellido_conyuge || 'No hay resultados',
            Cedula: resultThree.data[0].ced_conyuge || 'No hay resultados',
          }
        },
        {
          name: 'Hijos',
          children: children
        }
      ],
    });
    
  }else if(item.id==='menu.Foto'){
    let resultPhoto;
    resultPhoto = await axios.get(`/api/listimg/${value}`);
    console.log(resultPhoto);
    setDataPhoto(resultPhoto.data);
    setLoading(true);
  }
  }
}

    if (loading2) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ScaleLoader color="#123abc" height={80} width={10} radius={4} margin={4} />
      </div>
      );
    }
    const createPDFUsers= (dataUsers) => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(10);
  
      const title = "Consulta registro civil";
      const x = doc.internal.pageSize.width / 2;
      const y = 40;
      doc.setFontSize(10);  
      doc.text(title, x, y, { align: "center" });
      
      doc.setLineWidth(1);
      doc.setDrawColor(0);
      dataUsers.map((item) => { 
        doc.text("Datos del consultado : ", marginLeft, 70);
        doc.rect(20,80,420,180)
        doc.text("Cédula: " + `${item.identity||"NO HAY DATOS  " }`, marginLeft, 100);
        doc.text("Nombres: " + `${item.nombre_consultado||"NO HAY DATOS  " }`, marginLeft, 130);
        doc.text("Apellidos: " + `${item.apellido_consultado||"NO HAY DATOS  " }`, marginLeft, 160);
        doc.text("fecha de nacimiento: " +`${item.fecha_nacimiento||"NO HAY DATOS  " }`,marginLeft,190);
        doc.text("Género: "+`${convertGender(item.genero)||"NO HAY DATOS  " }`, marginLeft,220)
        doc.text("Estado civil: "+`${item.estado_civil||"NO HAY DATOS  " }`, marginLeft,250)
        if (!item.ced_conyuge && !item.nombre_conyuge && !item.apellido_conyuge && !item.fecha_nacimiento_conyuge && !item.genero_conyuge && !item.estado_civil_conyuge) {
          doc.text("Datos del Cónyuge del consultado: ", marginLeft, 280);
          doc.rect(20,290,420,180) 
          doc.text("NO HAY DATOS", marginLeft, 310);
          return;
        } else if (!item.identity_padre && !item.nombre_padre && !item.apellido_padre && !item.fecha_nacimiento_padre && !item.genero_padre && !item.estado_civil_padre) {
          doc.rect(20,510,420,200)
          doc.text("Datos del padre del consultado: ", marginLeft, 490);
          doc.text("NO HAY DATOS", marginLeft, 540);
          return;
        } else if(!item.identity_madre && 
          !item.nombre_madre && 
          !item.apellido_madre && 
          !item.fecha_nacimiento_madre && 
          !item.genero_madre && !item.estado_civil_madre){
          doc.text("Datos de la madre del consultado: ", marginLeft, 70);
          doc.text("NO HAY DATOS", marginLeft, 110);
          return;
        }
        doc.text("Datos del Cónyuge del consultado: ", marginLeft, 280);
        doc.rect(20,290,420,180) 
  
        doc.text("Cédula: " + `${item.ced_conyuge||"NO HAY DATOS  " }`, marginLeft, 310);
        doc.text("Nombres: " + `${item.nombre_conyuge||"NO HAY DATOS  " }`, marginLeft, 340);
        doc.text("Apellidos: " + `${item.apellido_conyuge||"NO HAY DATOS  " }`, marginLeft,370);
        doc.text("fecha de nacimiento: " +`${item.fecha_nacimiento_conyuge||"NO HAY DATOS  " }`,marginLeft,400);
        doc.text("Género: "+`${convertGender(item.genero_conyuge)||"NO HAY DATOS  " }`, marginLeft,430)
        doc.text("Estado civil: "+`${item.estado_civil_conyuge||"NO HAY DATOS  " }`, marginLeft,460) 
        doc.text("Datos del padre del consultado: ", marginLeft, 490);
        doc.rect(20,510,420,200)
        doc.text("Cédula: " + `${item.identity_padre||"NO HAY DATOS  " }`, marginLeft, 540);
        doc.text("Nombres: " + `${item.nombre_padre||"NO HAY DATOS  " }`, marginLeft, 570);
        doc.text("Apellidos: " + `${item.apellido_padre||"NO HAY DATOS  " }`, marginLeft, 600);
        doc.text("fecha de nacimiento: " +`${item.fecha_nacimiento_padre||"NO HAY DATOS  " }`,marginLeft,630);
        doc.text("Género: "+`${convertGender(item.genero_padre)||"NO HAY DATOS  " }`, marginLeft,660)
        doc.text("Estado civil: "+`${item.estado_civil_padre||"NO HAY DATOS  " }`, marginLeft,690)
        doc.addPage();
        doc.text("Datos de la madre del consultado: ", marginLeft, 70);
        doc.rect(20,80,420,200)
        doc.text("Cédula: " + `${item.identity_madre||"NO HAY DATOS  " }`, marginLeft, 110);
        doc.text("Nombres: " + `${item.nombre_madre||"NO HAY DATOS  " }`, marginLeft, 140);
        doc.text("Apellidos: " + `${item.apellido_madre||"NO HAY DATOS  " }`, marginLeft, 170);
        doc.text("fecha de nacimiento: " +`${item.fecha_nacimiento_madre||"NO HAY DATOS  " }`,marginLeft,200);
        doc.text("Género: "+`${convertGender(item.genero_madre)||"NO HAY DATOS  " }`, marginLeft,230)
        doc.text("Estado civil: "+`${item.estado_civil_madre||"NO HAY DATOS  " }`, marginLeft,260)
    });
    doc.save("datos_generales.pdf")
    }
    //iess
    const createPDFIess= (dataIess) => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(10);
  
      const title = "Consulta IESS";
      const x = doc.internal.pageSize.width / 2;
      const y = 40;
      doc.setFontSize(10);  
      doc.text(title, x, y, { align: "center" });
      
      doc.setLineWidth(1);
      doc.setDrawColor(0);
      dataIess.map((item) => {
        if (!item.provincia_iess 
          && !item.canton_iess && !item.parroquia_iess
          ) {
          doc.rect(20,80,520,260)
          doc.text("NO HAY DATOS", marginLeft, 110);
          return;
        }
        doc.text("Datos del consultado: ", marginLeft, 70);
        doc.rect(20,80,520,260)
        doc.text("Cédula: " +`${item.identity||"NO HAY DATOS  " }`, marginLeft, 110);
        doc.text("Nombres: "+`${item.nombre_consultado||"NO HAY DATOS  " }`, marginLeft, 140);
        doc.text("Apellidos: "+`${item.apellido_consultado||"NO HAY DATOS  " }`, marginLeft, 170);
        doc.text("Email: " +`${item.mail_iess||"NO HAY DATOS  " }`,marginLeft,200);
        doc.text("Teléfono: "+`${item.telefono_iess||"NO HAY DATOS  " }`, marginLeft,230)
        doc.text("Provincia: "+`${item.provincia_iess||"NO HAY DATOS  " }`, marginLeft,260)
        doc.text("Cantón: "+`${item.canton_iess||"NO HAY DATOS  " }`,marginLeft, 290);
        doc.text("Parroquia: "+`${item.parroquia_iess||"NO HAY DATOS  " }`, marginLeft, 320);
    });
    doc.save("Datos_IESS.pdf")
    }
    //policia
    const createPDFPolicia= (dataPolicia) => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(10);
  
      const title = "Consulta de Polícia";
      const x = doc.internal.pageSize.width / 2;
      const y = 40;
      doc.setFontSize(10);  
      doc.text(title, x, y, { align: "center" });
      doc.setLineWidth(1);
      doc.setDrawColor(0);
      dataPolicia.map((item) => {
        if (!item.institucion && !item.nivel_policial && !item.cargo_policia
          && !item.fecha_ingreso_policia && !item.fecha_egreso_policia
          ) {
          doc.rect(20,80,420,280)
          doc.text("NO HAY DATOS", marginLeft, 110);
          return;
        }
        doc.text("Datos del consultado :", marginLeft, 70);
        doc.rect(20,80,420,280)
        doc.text("Cédula: " + `${item.identity||"NO HAY DATOS  " }`, marginLeft, 110);
        doc.text("Nombres: " + `${item.nombre_consultado||"NO HAY DATOS  " }`, marginLeft, 140);
        doc.text("Apellidos: " + `${item.apellido_consultado||"NO HAY DATOS  " }`, marginLeft, 170);
        doc.text("Intitución: " +`${item.institucion||"NO HAY DATOS  " }`,marginLeft,200);
        doc.text("Nivel: " +`${item.nivel_policial||"NO HAY DATOS  " }`,marginLeft,230);
        doc.text("Cargo: "+`${item.cargo_policial||"NO HAY DATOS  " }`, marginLeft,260)
        doc.text("Género : "+`${item.genero||"NO HAY DATOS  " }`, marginLeft,290)
        doc.text("Email del trabajo: "+`${item.email_trabajo||"NO HAY DATOS  " }`, marginLeft, 320);
        doc.text("Email: "+`${item.email_personal||"NO HAY DATOS  " }`,marginLeft,350)
    });
    doc.save("Datos_policia.pdf")
    }

    //profesores
    const createPDFTeachers= (dataTeacher) => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(10);
  
      const title = "Consulta de profesores";
      const x = doc.internal.pageSize.width / 2;
      const y = 40;
      doc.setFontSize(10);  
      doc.text(title, x, y, { align: "center" });
      
      doc.setLineWidth(1);
      doc.setDrawColor(0);
      dataTeacher.map((item) => {
        if ( !item.zona_profesor && !item.distrito_educativo && !item.provincia_profesor
          && !item.canton_profesor && !item.institucion_profesor && !item.telefono_profesor
          && !item.celular_profesor && !item.modalidad_laboral && !item.nivel_profesor
          && !item.cargo_profesor
          ) {
          doc.rect(20,80,420,280)
          doc.text("NO HAY DATOS", marginLeft, 110);
          return;
        }
        doc.text("Datos del consultado :", marginLeft, 70);
        doc.rect(20,80,420,500)
        doc.text("Cédula: " + `${item.identity||"NO HAY DATOS " }`, marginLeft, 110);
        doc.text("Nombres: " + `${item.nombre_consultado||"NO HAY DATOS " }`, marginLeft, 140);
        doc.text("Apellidos: " + `${item.apellido_consultado||"NO HAY DATOS " }`, marginLeft, 170);
        doc.text("Zona de distrito: " +`${item.zona_profesor||"NO HAY DATOS " }`,marginLeft,200);
        doc.text("Distrito educativo: "+`${item.distrito_educativo||"NO HAY DATOS " }`, marginLeft,230)
        doc.text("Provincia: "+`${item.provincia_profesor||"NO HAY DATOS " }`, marginLeft,260)
        doc.text("Cantón: "+`${item.canton_profesor||"NO HAY DATOS " }`, marginLeft,290);
        doc.text("Institución: "+`${item.institucion_profesor||"NO HAY DATOS " }`,marginLeft,320)
        doc.text("Teléfono: "+`${item.telefono_profesor||"NO HAY DATOS " }`, marginLeft,350)
        doc.text("Celular: "+`${item.celular_profesor||"NO HAY DATOS " }`, marginLeft,380)
        doc.text("Modalidad laboral: "+`${item.modalidad_laboral||"NO HAY DATOS " }`, marginLeft,410)
        doc.text("Nivel: "+`${item.nivel_profesor||"NO HAY DATOS " }`, marginLeft,440)
        doc.text("Cargo: "+`${item.cargo_profesor||"NO HAY DATOS " }`, marginLeft,470)
         });
    doc.save("Datos_Profesores.pdf")
    }
    //doctores
    const createPDFDoctors= (dataDoctor) => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(10);
  
      const title = "Consulta de doctores";
      const x = doc.internal.pageSize.width / 2;
      const y = 40;
      doc.setFontSize(10);  
      doc.text(title, x, y, { align: "center" });
      
      doc.setLineWidth(1);
      doc.setDrawColor(0);
      dataDoctor.map((item) => {
        if (item.email_doctor && !item.email_trabajo_doctor && !item.telefono_doctor
          && item.genero_doctor
          ) {
          doc.rect(20,80,420,280)
          doc.text("NO HAY DATOS", marginLeft, 110);
          return;
        }
        doc.text("Datos del consultado: ", marginLeft, 70);
        doc.rect(20,80,420,230)
        doc.text("Cédula: " +`${item.identity||"NO HAY DATOS "}`, marginLeft, 110);
        doc.text("Nombres: " +`${item.nombre_consultado||"NO HAY DATOS "}`, marginLeft, 140);
        doc.text("Apellidos: " +`${item.apellido_consultado||"NO HAY DATOS "}`, marginLeft, 170);
        doc.text("Email doctor: " +`${item.email_doctor||"NO HAY DATOS "}`,marginLeft,200);
        doc.text("Email del trabajo: "+`${item.email_trabajo_doctor||"NO HAY DATOS "}`, marginLeft,230)
        doc.text("Telefono doctor: "+`${item.telefono_doctor||"NO HAY DATOS "}`, marginLeft,260)
        doc.text("Género del doctor: "+`${item.genero_doctor||"NO HAY DATOS "}`,marginLeft,290);
    });
    doc.save("Datos_doctor.pdf")
    }
    //asamblea
    const createPDFAsamblea= (dataAsamblea) => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(10);
  
      const title = "Consulta Asamblea";
      const x = doc.internal.pageSize.width / 2;
      const y = 40;
      doc.setFontSize(10);  
      doc.text(title, x, y, { align: "center" });
      
      doc.setLineWidth(1);
      doc.setDrawColor(0);
      dataAsamblea.map((item) => {
        if (!item.cedula && !item.nombre_consultado && !item.cargo_asambleista
          &&!item.partido_asambleista && !item.comisiones_asambleista
          &&!item.cargo_asambleista && !item.correo_asambleista
          ) {
          doc.rect(20,80,420,280)
          doc.text("NO HAY DATOS", marginLeft, 110);
          return;
        }
        doc.text("Datos del consultado :", marginLeft, 70);
        doc.rect(20,80,420,270)
        doc.text("Cédula: " + `${item.cedula||"NO HAY DATOS"}`, marginLeft, 110);
        doc.text("Nombres y Apellidos: " + `${item.nombre_consultado||"NO HAY DATOS"}`, marginLeft, 140);
        doc.text("Cargo: " +`${item.cargo_asambleista||"NO HAY DATOS"}`,marginLeft,170);
        doc.text("Partido: "+`${item.partido_asambleista||"NO HAY DATOS"}`, marginLeft,200)
        doc.text("Comisión asambleistas: "+`${item.comisiones_asambleista||"NO HAY DATOS"}`, marginLeft,230)
        doc.text("Cargo de comisiones: "+`${item.cargo_comisiones_asambleista||"NO HAY DATOS"}`, marginLeft, 260);
        doc.text("Correo: "+`${item.correo_asambleista||"NO HAY DATOS"}`,marginLeft,290)
        });
    doc.save("Datos_asambleista.pdf")
    }
    //CONADIS
    const createPDFCONADIS= (dataConadis) => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(10);
  
      const title = "Consulta de CONADIS";
      const x = doc.internal.pageSize.width / 2;
      const y = 40;
      doc.setFontSize(10);  
      doc.text(title, x, y, { align: "center" });
      
      doc.setLineWidth(1);
      doc.setDrawColor(0);
      dataConadis.map((item) => {
        doc.text("Datos del CONADIS  : ", marginLeft, 70);
        doc.rect(20,80,550,500)
        doc.text("Codigo CONADIS: " + `${item.CODIGO_CONADIS||"NO HAY DATOS  " }`, marginLeft, 100);
        doc.text("Cédula: " + `${item.CEDULA||"NO HAY DATOS  " }`, marginLeft, 520);
        doc.text("Nombres: " + `${item.NOMBRES||"NO HAY DATOS  " }`, marginLeft, 130);
        doc.text("Apellidos: " + `${item.APELLIDOS||"NO HAY DATOS  " }`, marginLeft, 160);
        doc.text("Tipo de discapacidad actual: " +`${item.TIPO_DISCAPACIDAD_ACTUAL||"NO HAY DATOS  " }`,marginLeft,190);
        doc.text("Grado de discapacidad: "+`${item.GRADO_DISCAPACIDAD_ACTUAL||"NO HAY DATOS  " }`, marginLeft,220)
        doc.text("Porcentaje de discapacidad: "+`${item.PORCENTAJE_DISCA_ACTUAL||"NO HAY DATOS  " }`, marginLeft,250)
        doc.text("Período adquisición: " + `${item.PERIODO_ADQUISICION||"NO HAY DATOS  " }`, marginLeft,280);
        doc.text("Período de tipo adquisición : " + `${item.PERIODO_ADQUISICION_TIPO||"NO HAY DATOS  " }`, marginLeft,310);
        doc.text("Edad: " + `${item.EDAD||"NO HAY DATOS  " }`, marginLeft,340);
        doc.text("Telf convencional: " +`${item.TELEFONO_CONVEN||"NO HAY DATOS  " }`,marginLeft,370);
        doc.text("Telf célular: "+`${item.TELEFONO_CELULAR||"NO HAY DATOS  " }`, marginLeft,400)
        doc.text("Provincía: "+`${item.PROVINCIA||"NO HAY DATOS  " }`, marginLeft,430)
        doc.text("Cantón:"+`${item.CANTON||"NO HAY DATOS "}`, marginLeft, 460);
        doc.text("Parroquia:"+`${item.PARROQUIA||"NO HAY DATOS "}`, marginLeft, 490);
    });
    doc.save("CONADIS.pdf")
    }
    const handleTextChange = async () => {
      setButtonDisabled(true);
      const formData = new FormData();
      formData.append('observacion', text.replace(/<p>/gi, "").replace(/<\/p>/gi, ""));
      formData.append('identity', identity);

      try{
           await axios.post('api/observation',formData)
            .then(res => {
                console.log(res.data)
                setButtonDisabled(true)
                setText(res.data)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Observación agregada',
                    showConfirmButton: false,
                    timer: 1500,
            })
            })
        } catch(e) {
            console.log(e)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al agregar observación',
                showConfirmButton: false,
                timer: 1500
        })
        }
    };
  return (

    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <Sidebar />
      <main>
        <h1 className={s.titleConsulta}>Consulta General</h1>
        <div className={s.contenedor} style={{marginTop:"20px"}}>
        <InputGroup className="d-flex justify-content-center m-3">
            <Input
              className={s.searchBar}
              name="searchKeyword"
              id="searchKeyword"
              placeholder=" Buscar por cédula"
              onChange={handleChange}
              disabled={inputDisabled}
              pattern="[0-9]*"
              autoComplete="off"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                  toast.error('Solo se permiten numeros');
                }
              }}
              maxLength="10"
            />
            {showNewQueryButton && (
  <Button onClick={handleNewQuery}>Realizar nueva consulta</Button>
)}
            {/*  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} {...props}> */}
            <Dropdown isOpen={dropdownOpen} toggle={toggle} {...props}>
              <DropdownToggle
              style={{marginTop:"5px"}}
                caret
                size="lg"
                onClick={(e) => setIsActive(!isActive)}
                className={s.bottonSearchBar}
              >
                <FontAwesomeIcon
                  style={{ fontSize: '20px', marginRight: '10px' }}
                  icon={faSearch}
                />
                Buscar por
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => actionsDropdownName()}
                  style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                  }}
                >
                  Apellidos y Nombres
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/*  </ButtonDropdown> */}
          </InputGroup>
{photoUrl ? (
<img src={photoUrl} className="text-center"  style={{ height: "150px", width: "150px" ,display: "block", margin: "auto", verticalAlign: "middle"  }} />
) : (
<img src={photoNf} className="text-center" style={{ height: "100px", width: "100px",display: "block", margin: "auto", verticalAlign: "middle"  }} />
)}
      {errorMesages && <span className="text-danger text-center"
      style={{fontSize:'15px',
      fontWeight:'bold',
      fontFamily:'sans-serif',
      textAlign:'center'
      }}>{errorMesages}</span>}
  
   <div className={classes.root}>
   handleSubmit    {data.map((item) => {
  if (item.id === 'menu.search') {
    return (
      
      <Accordion key={item.id}>
        <AccordionSummary
         onClick={() => {
          handleMenuClick(item);
      }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
          <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faAddressCard}
                        />
                        {item.label}
                      </Typography>
        </AccordionSummary>
        <AccordionDetails className={s.acordionDivPdf}>
            {loading && dataUsers.map((user,index) => (
                      <Users user={user} key={`${user.identity} -${index}`}/>
            ))}             
            {dataUsers.length === 0 && <div className="text-center">
              <SpinnerCircular
                size={50}
                thickness={100}
                speed={100}
                color="#005da2"
                secondaryColor="rgba(0, 0, 0, 0.44)" 
                enabled={false} 
              />
            </div>}
            {!loading==0 && <div className="text-center">
                
              </div>}
            <div className={s.divDescargaPdf}>
            {loading && dataUsers.length > 0 && <div>
              
              <Button color="primary" 
              onClick={() => createPDFUsers(dataUsers)} className={s.descargarPdf}>Descargar PDF</Button>
            </div>}
            </div>
        </AccordionDetails>
      </Accordion>
    );
  } else if (item.id === 'menu.IESS') {
    return (
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
            handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
          <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faPassport}
                        />
                        {item.label}
                      </Typography>
        </AccordionSummary>
        <AccordionDetails className={s.acordionDivPdf}>
        {loading && dataIess.map((userIess,index)=> (
           
           <UserIess userIess={userIess} key={`${userIess.iess_cedula}-${index}`}/>
          ))}
         {
    dataIessButton && dataIessButton.length  > 0 ? (
    <div className={s.divDescargarPdf}>
      <Button color="primary" onClick={() => createPDFIess(dataIess)} className={s.descargarPdf}>
        Descargar PDF
      </Button>
    </div>
  ) : (
    <div className='w-100 text-center'>
    <p>No se encontraron resultados</p>
     </div>
  )}
            {loading && dataIess.length === 0 && <div className="text-center">
              <SpinnerCircular
                size={50}
                thickness={100}
                speed={100}
                color="#005da2"
                secondaryColor="rgba(0, 0, 0, 0.44)" 
                enabled={true} 
              />
            </div>}
            {!loading==0 && <div className="text-center">
              
            </div>}
        </AccordionDetails>
      </Accordion>
    );
  } else if (item.id === 'menu.POLICIA') {
    return (
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
            handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
          <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faBuildingShield}
                        />
                        {item.label}
                      </Typography>
        </AccordionSummary>
        <AccordionDetails className={s.acordionDivPdf} >
            {loading && dataPolicia.map((userPolices,index) => (
           
                      <UsersPolicia userPolices={userPolices}  key={`${userPolices.identity}-${index}`}/>
            ))}
          {dataPolicesButton && dataPolicesButton.length > 0 ? (
      <div className={s.divDescargarPdf}>
      <Button color="primary" onClick={() => createPDFPolicia(dataPolicia)} className={s.descargarPdf}>
        Descargar PDF
      </Button>
    </div>
  ) : (
    <div className='w-100 text-center'>
   <p>No se encontraron resultados</p>
    </div>
    
  )}
            {loading && dataPolicia.length === 0 && <div className="text-center">
              <SpinnerCircular
                size={50}
                thickness={100}
                speed={100}
                color="#005da2"
                secondaryColor="rgba(0, 0, 0, 0.44)" 
                enabled={true} 
              />
            </div>}
            {!loading==0 && <div className="text-center">
            </div>}
        </AccordionDetails>
      </Accordion>
    );
  }else if(item.id==='menu.PROFESORES'){
    return(
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
            handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
       <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faChalkboardTeacher}
                        />
                        {item.label}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={s.acordionDivPdf}>
            {loading && dataTeacher.map((userTeacher) => (
           
                      <UsersTeachers userTeacher={userTeacher} key={`${userTeacher.identity}`}/>
            ))}
            {dataTeacherButton && dataTeacherButton.length > 0 ? (
            <div className={s.divDescargarPdf}>
          <Button color="primary" onClick={() => createPDFTeachers(dataTeacher)} className={s.descargarPdf}>
          Descargar PDF
          </Button>
      </div>
  ) : (
    <div className='w-100 text-center'>
   <p>No se encontraron resultados</p>
    </div>
    
  )}
            {loading && dataTeacher.length === 0 && <div className="text-center">
              <SpinnerCircular
                size={50}
                thickness={100}
                speed={100}
                color="#005da2"
                secondaryColor="rgba(0, 0, 0, 0.44)" 
                enabled={true} 
              />
            </div>}
       
        </AccordionDetails>
      </Accordion>
    );
  } else if(item.id==='menu.DOCTORES'){
    return(
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
            handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
          <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faUserDoctor}
                        />
                        {item.label}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={s.acordionDivPdf}>
            {loading && dataDoctor.map((userDoctors ,index) => (
           
                      <UserDoctors userDoctors={userDoctors}  key={`${userDoctors.identity}-${index}`}/>
            ))}
                        {
    dataDoctorButton && dataDoctorButton.length > 0 ? (
    <div className="text-center">
      <Button color="primary" onClick={() => createPDFDoctors(dataDoctor)} style={{marginTop:'220px',display:'flex', justifyContent:'flex-start',marginRight:'50%'}}>
        Descargar PDF
      </Button>
    </div>
  ): (
    <div className='w-100 text-center'>
   <p>No se encontraron resultados</p>
    </div>
    
  )}
            {loading && dataDoctor.length === 0 && <div className="text-center">
              <SpinnerCircular
                size={50}
                thickness={100}
                speed={100}
                color="#005da2"
                secondaryColor="rgba(0, 0, 0, 0.44)" 
                enabled={true} 
              />
            </div>}
            {!loading==0 && <div className="text-center">
            </div>}
        </AccordionDetails>
      </Accordion>
    );

  } else if(item.id==='menu.CONADIS'){
    return(
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
            handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
          <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faUserDoctor}
                        />
                        {item.label}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={s.acordionDivPdf}>
            {loading && dataConadis.map((userHandicapped ,index) => (
           
                      <UsersHandicapped userHandicapped={userHandicapped}  key={`${userHandicapped.CEDULA}-${index}`}/>
            ))}
          <div className="ws-100 text-center">
            {loading && dataConadis.length > 0 && (
             <div className={s.divEmpresas}>
             {loading && dataConadis.length > 0 && (
                 <Button
                   onClick={() => createPDFCONADIS(dataConadis)}
                className={s.descargarPdf}
                 >
                   Descargar PDF
                 </Button>
             )}
           </div>
            )}
          </div>
            {loading && dataConadis.length === 0 && <div className="text-center">
              <p>No se encontraron resultados</p>
             </div>}
           
        </AccordionDetails>
      </Accordion>
    );

  } 
  else if(item.id==='menu.ASAMBLEA'){
    return (
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
            handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
           <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faUsersBetweenLines}
                        />
                        {item.label}
                      </Typography>
        </AccordionSummary>
        <AccordionDetails className={s.acordionDivPdf}>
        {loading && dataAsamblea.map((asambleista,index)=> (
           
           <AsambleistasUsers asambleista={asambleista} key={`${asambleista.cedula}-${index}`}/>
          ))}
         {loading && dataAsamblea.length > 0 && <div className={s.divDescargarPdf}>
              <Button  className={s.descargarPdf} onClick={() => createPDFAsamblea(dataAsamblea)}>Descargar PDF</Button>
            </div>}

            {dataAsamblea.length === 0 && <div className="text-center">
              <p>No se encontraron resultados</p>
              <SpinnerCircular
                size={50}
                thickness={100}
                speed={100}
                color="#005da2"
                secondaryColor="rgba(0, 0, 0, 0.44)" 
                enabled={false} 
              />
            </div>}
        </AccordionDetails>
      </Accordion>
    );
  }else if(item.id==='menu.Documentos'){
    return(
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
            handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
          <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faFolder}
                        />{' '}
                        {item.label}
                      </Typography>
        </AccordionSummary>
        <AccordionDetails
        className={s.acordionDivPdf}
        style={{ flexDirection: 'row' }}
        >
        <Grid container>
       <Grid item xs={12}>
        <h4>Subir Documentos</h4>
        </Grid>
        <Grid item xs={12}
         style={{ marginTop: '15px', marginBottom: '15px' }}>
        
            <Input
                id="exampleFile"
                name="file"
                type="file"
                onChange={handlePdfChange}
            />
        </Grid>
        <Grid item xs={12}>
            <Button onClick={handleSubmit}>Subir PDF</Button>
        </Grid>
    </Grid>
    <Grid container>
    <Grid item xs={12} style={{ width: '0px', height: '30px', margin: '0 auto' }}>
      <h3>Documentos encontrados</h3>
      </Grid>
      <Grid container spacing={3}>
  {dataDocument.map((document,index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card>
        <img src={image} style={{ height: "120px", width: "120px" }} />
        <CardBody>
          <CardText>{document.pdf_path}</CardText>
          <Button onClick={() => handleOpenModal(document)} color="primary">Ver PDF</Button>
        </CardBody>
      </Card>
    </Grid>
  ))}
</Grid>
</Grid>
  <Modal isOpen={showModal} onRequestClose={handleCloseModal} appElement={document.getElementById('root')}>
  <PDFViewer document={{url:pdfUrl}} />
</Modal> 
</AccordionDetails>
      </Accordion>
    );
  }else if (item.id === 'menu.Notas') {
    return (
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
            handleMenuClick(item);
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
        >
          <Typography className={classes.heading}>
            <FontAwesomeIcon
              style={{ fontSize: '20px', marginRight: '10px' }}
              icon={faFileLines}
            />{' '}
            {item.label}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={s.acordionDivPdf}>
          <div className={classes.quillContainer}>
            <h4>Palabras: {wordLetter} /300</h4>
            <ReactQuill
              value={text}
              onChange={(value) => {
                setText(value);
                setLetterCount(countLetters(value));
                setButtonDisabled(
                  value === '' || countLetters(value) > wordLimit
                );
              }}
              onKeyPress={handleKeyPress}
              modules={modules}
            />
            <Button
              onClick={handleTextChange}
              disabled={buttonDisabled}
            >
              Enviar
            </Button>
            <Button onClick={handleOpenModal2}>Ver notas</Button>
            <Modal
              isOpen={showModal2}
              onRequestClose={handleCloseModal2}
              appElement={document.getElementById('root')}
              className={s.modal}
            >
              <h1>Notas</h1>

              <div className={s.divNotas}>
                {dataNotes
                  ?.slice(prev, next)
                  ?.map((note, index) => (
                    <div
                      key={`${index}`}
                      // style={{ backgroundColor: 'lightgrey' }}
                      className={s.divNotas1}
                    >
                      <div>
                        <strong>{note.observacion}</strong>
                        <br />
                        Fecha de creación:{' '}
                        {new Date(
                          note.created_at
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                {loading && dataNotes.length === 0 && (
                  <div className="text-center">
                    <SpinnerCircular
                      size={50}
                      thickness={100}
                      speed={100}
                      color="#005da2"
                      secondaryColor="rgba(0, 0, 0, 0.44)"
                      enabled={true}
                    />
                  </div>
                )}
              </div>
              <div className={s.divPagYX}>
                <div>
                  <Button onClick={paginacionPrev}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                  </Button>
                  <Button onClick={paginacionNext}>
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                  </Button>
                </div>
                <Button
                  className="btn-close"
                  onClick={handleCloseModal2}
                >
                  X
                </Button>
              </div>
            </Modal>
          </div>
        </AccordionDetails>
      </Accordion>
    );
  }else if (item.id==='menu.Arbol'){
    return(
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
          handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
          >
          <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faFolderTree}
                        />
                        {item.label}
                      </Typography>
          </AccordionSummary>
          <AccordionDetails>
          {
  loading &&seeDataThree.length===0 ? (
    <div className="text-center">
      <SpinnerCircular
        size={50}
        thickness={100}
        speed={100}
        color="#005da2"
        secondaryColor="rgba(0, 0, 0, 0.44)"
        enabled={true}
      />
    </div>
  ) : seeDataThree && seeDataThree.length > 0 ? (
    <div>
      <div style={{ width: '100em', height: '50em' }}>
      <Tree data={orgChart}   nodeSize={{ x: 200, y: 200 }} 
  translate={{ x: 50, y: 50 }} 
  orientation="horizontal" 
  zoomable={false}
  >
</Tree>
</div>
<Button
                            onClick={() => handleOpenModal4()}
                            style={{
                              position: 'absolute',
                              left: '15px',
                              bottom: '15px',
                            }}
                          >
                            Editar cédulas
                          </Button>
                          <Modal
                            isOpen={showModal4}
                            onRequestClose={handleCloseModal4}
                            appElement={document.getElementById('root')}
                            className={s.modal}
                          >
                            <h1>Editar cédulas de padre y de madre</h1>
                            <div className="col-sm-10 ">
                              <label className={`col-form-label ${s.label}`}>
                                Nombre padre
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                aria-label="Cedula"
                                value={dataNameUser}
                                style={{ borderRadius: '10px' }}
                              />
                            </div>
                            <div className="col-sm-10 ">
                              <label className={`col-form-label ${s.label}`}>
                                Cédula padre
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                aria-label="Cedula"
                                value={dataFather}
                                onChange={(e) => setDataFather(e.target.value)}
                                style={{ borderRadius: '10px' }}
                              />
                            </div>

                            <div className="col-sm-10 ">
                              <label className={`col-form-label ${s.label}`}>
                                Nombre madre
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                aria-label="Cedula"
                                value={dataNameMother}
                                disabled={true}
                                style={{ borderRadius: '10px' }}
                              />
                            </div>
                            <div className="col-sm-10">
                              <label className={`col-form-label ${s.label}`}>
                                cédula madre
                              </label>
                              <Input
                                type="text"
                                className="form-control"
                                aria-label="Cedula"
                                value={dataMother}
                                style={{ borderRadius: '10px' }}
                                onChange={(e) => setDataMother(e.target.value)}
                              />
                            </div>
                            <div className="col-sm-10">

                            <Button
                              className="btn-close"
                              onClick={handleCloseModal4}
                              >
                              {/* <i className="simple-icon-close" /> */}X
                            </Button>
                            <Button style={{margin:"10px"}}                             
                              onClick={() => updateIdentityFaherAndMother()}
                              >
                              {/* <i className="simple-icon-arrow-left" /> */}
                              Actualizar cédulas
                            </Button>
                              </div>
                          </Modal>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p>No se encontraron resultados</p>
                        </div>
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              } else if(item.id==='menu.Foto'){
    return(
      <Accordion key={item.id}>
        <AccordionSummary
          onClick={() => {
          handleMenuClick(item);
        }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.id}-content`}
          id={`${item.id}-header`}
          >
             <Typography className={classes.heading}>
                        <FontAwesomeIcon
                          style={{ fontSize: '20px', marginRight: '10px' }}
                          icon={faCamera}
                        />
                        {item.label}
                      </Typography>
          </AccordionSummary>
          <AccordionDetails
           className={s.acordionDivPdf}
           style={{ flexDirection: 'row' }}
          >
          <Grid container>
       <Grid item xs={12}>
        <h4>Subir Foto</h4>
        </Grid>
        <Grid item xs={12}
         style={{ marginTop: '15px', marginBottom: '15px' }}>
       
            <Input
                id="exampleFile"
                name="file"
                type="file"
                onChange={handlePhotoChange}
            />
        </Grid>
        <Grid item xs={12}>
            <Button color="primary" onClick={handleSubmitPhoto}>Subir imagen</Button>
        </Grid>
    </Grid>
    <Grid container>
    <Grid item xs={12} style={{ width: '0px', height: '30px', margin: '0 auto' }}>
      <h3>Foto encontrada</h3>
      </Grid>
      <Grid container spacing={3}>
  {dataPhoto.map((photo,index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card>
      {photoUrl ? (
<img src={photoUrl} className="text-center"  style={{ height: "150px", width: "150px" ,display: "block", margin: "auto", verticalAlign: "middle"  }} />
) : (
<img src={photoNf} className="text-center" style={{ height: "100px", width: "100px",display: "block", margin: "auto", verticalAlign: "middle"  }} />
)}
        <CardBody>
          <CardText>{photo.img_path}</CardText>
          <Button onClick={() => handleOpenModal3(photo)} color="primary">Ver imagen</Button>
        </CardBody>
      </Card>
    </Grid>
  ))}
</Grid>
</Grid>
 
  
          </AccordionDetails>
          </Accordion>
    )

  }
})}

<div className="text-center">
</div>
    </div>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
        </div>
        <Footer />
      </main>
    
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
