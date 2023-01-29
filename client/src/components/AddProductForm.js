import {useState, useEffect, useContext} from 'react';
import {AppContext} from '../App'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import FileUploader from './FileUploader'
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import { TextField } from '@mui/material';


const AddProductForm = (props) =>{
    const [name, setName] = useState("");
    const [category, setCategory] = useState("1");
    const [selectedFile, setSelectedFile] = useState(null);
    const {categoryList, setCategoryList} = useContext(AppContext);
    
    const navigate = useNavigate();

        useEffect(()=>{
            fetch('/api/categories')
            .then(res => {
                if (res.status===200){
                    return res.json()
                }else{
                    throw new Error ("failed status")
                    // navigate('/login')
                }
            })
            .then(data =>{
                setCategoryList(data)
                
            })
            .catch(e=>{
                console.log(e);
            })
        },[])

    const submitForm = (e) => {
        // e.preventDefault();
        // let data = {
        //     "name": name,
        //     "category": category,
        //     "filename": selectedFile.name,
        // }
        const data = new FormData();
        data.append("name", name);
        data.append("category", category);
        data.append('file', selectedFile);
        axios({
            method: "post",
            url: "/api/upload",
            data: data,
          })
          .then((res) => {
            toast.success('Upload Success');
        })
          .catch((err) => toast.error('Upload Error'));
      };

      const myinputstyle = {
        width: '12.5vw',
        height: '6vh',
        borderRadius: '5px',
        border: '1px solid gray',
        backgroundColor: 'transparent',
        color: '#5A5A5A',
        fontSize: '18px',
        paddingLeft: '10px',
        marginTop: '1vh'
        
      };

      const mystyle = {
        width: '12.5vw',
        height: '6vh',
        borderRadius: '5px',
        border: '1px solid gray',
        backgroundColor: 'transparent',
        color: '#5A5A5A',
        fontSize: '18px',
        paddingLeft: '10px',
        marginTop: '0',
        marginBottom: '5vh'
      };

      const buttonstyle = {
        width: '8vw',
        height: '6vh',
        borderRadius: '5px',
        border: '1px solid gray',
        backgroundColor: '#70b04d',
        color: 'black',
        fontWeigth: '600',
        fontSize: '16px',
        marginTop: '1vh',
        marginBottom: '9vh'
      };
    return(
        <>
        <form encType="multipart/form-data">
        <input style={myinputstyle} label="Product" placeholder='Product Name' name='search' value={name} onChange={(e) => setName(e.target.value)}/>
        {/* <TextField style={{marginTop: '5vh'}} id="outlined-basic" label="Product Name" value={name} variant="outlined" onChange={(e) => setName(e.target.value)}></TextField> */}
            {/* Product Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}/> */}
            <h4 style={{margin:'5vh'}}>Select category of the product</h4>
             <select style={mystyle} name='categoryId' value={category} onChange={(e)=>setCategory(e.target.value)}>
            {
                
                categoryList ? categoryList.map(item=>{
                        return(
                            <option value={item.id}>{item.name}</option>)
                        
                    }) : ''
            }
                
            </select>
            <FileUploader 
                Success={({ file }) => setSelectedFile(file)}
                Error={({ error }) => alert(error)}
            />
            <ToastContainer/>
            
            <button style={buttonstyle} onClick={submitForm}>Submit</button>
        </form>


        </>
    )
}

export default AddProductForm