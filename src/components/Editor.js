import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    updateDoc,
    collection,
    doc,
    onSnapshot
} from 'firebase/firestore';

const Editor = ({database}) => {
    
    const databaseCollection = collection(database, 'docs-data');  // docs-data is collection name
    let params = useParams();
    const [titleDocs, setTitleDocs] = useState("");
    const [editorData, setEditorData] = useState("");
    const getQuillData = (value) => {
        setEditorData(value);
    }
    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(databaseCollection, params.id)
            updateDoc(document, {
                body: editorData
            })
                .then(() => {
                    toast.success('Document Saved', {
                        autoClose: 2000
                    })
                })
                .catch(() => {
                    toast.error('Cannot Save Document', {
                        autoClose: 2000
                    })
                })
        }, 2000)
        return () => clearTimeout(updateDocsData)
    }, [editorData])
   
    useEffect(()=>{
        const document = doc(databaseCollection, params.id)
        onSnapshot(document, (docs) => {
            setTitleDocs(docs.data().titleDocs);
            setEditorData(docs.data().body)
        });
    },[])
    

  return (
    <div className='editDocs_main'>
    <ToastContainer />
    <h1>{titleDocs}</h1>
    <div className='editDocs_inner'>
        <ReactQuill
            className='react-quill'
            value={editorData}
            onChange={getQuillData}
        />
    </div>
</div>
  )
}

export default Editor
