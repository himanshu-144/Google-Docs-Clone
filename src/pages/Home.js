import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import {signOut,getAuth,onAuthStateChanged} from "firebase/auth" 
import {useNavigate} from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import {collection, addDoc,onSnapshot} from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Home = ({database}) => {

const[isadd,setIsAdd] = useState(false);
const[title,setTitle] = useState("");
const[docsData,setDocsData] = useState([]);

const navigate = useNavigate();
let databaseCollection = collection(database, "docs-data");  // docs-data is collection name
let auth = getAuth();
let userEmail= localStorage.getItem("userEmail");

const logOut=()=>{
 signOut(auth)
 .then(()=>{ 
     navigate('/');
 })
};
useEffect(() =>{
    onAuthStateChanged(auth ,(response) =>{
       if(response){
         navigate('/home')
       }
       else{
        navigate('/');
       }
    });
},[])
  
  const addDocumemt = () =>{
     addDoc(databaseCollection,
      {
        title : title,
        author :userEmail,
        body: "",

      }
      ).then((response)=>{
        toast.success("Document Created", {
          autoClose : 1000
        })
         setIsAdd(false)
         setTitle("")
      }).catch(()=>{
        toast.error("Can't Create Document",{autoClose :1000})
      })
  };

  useEffect(()=>{
    onSnapshot(databaseCollection, (response)=>{
      setDocsData(response.docs.map((doc)=>{
        return {...doc.data(), id : doc.id}
      }))
    });
  },[])

const openEditor = (id)=>{
     //console.log(id);
     navigate(`/editor/${id}`)
}
  return (
    <div>
    <ToastContainer />
      <div style={{position:"absolute",top:12, right:12}}>
         <Button onClick={logOut}
           variant="contained">Log Out</Button>
      </div>
      <Button style={{marginTop:5}}
      onClick={()=>setIsAdd(!isadd)} 
      variant="outlined" 
      startIcon={<AddIcon />}>ADD DOCUMENT</Button>
      {
        isadd ? (
          <div style={{marginTop : 20,display:"flex",justifyContent:"center"}}>
              <input className='inputpart' 
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
               placeholder='Add a Title...'/>
               <button className='button' onClick={addDocumemt}
               >ADD</button>
           </div>
        ) : (
          <></>
        )
      }
     <div className='grid_main'>
      {
        docsData.map((doc)=>{
          return (
                <div className='grid_child' onClick={()=>openEditor(doc.id)}>
                  <h3>{doc.title}</h3>
                </div>
          )
        })
      }
     </div>

      
    </div>
  )
}

export default Home
