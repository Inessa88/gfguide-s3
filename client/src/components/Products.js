import {useState, useEffect, useContext} from 'react';
import {AppContext} from '../App'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Select } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput, MenuItem } from '@mui/material';



const Products = (props) =>{
    const[products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState([]);
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [searchCategory, setSearchCategory] = useState([]);
    const [msg, setMsg] = useState('')

    const {categoryList, setCategoryList} = useContext(AppContext);

    const navigate = useNavigate()


    useEffect(()=>{
        fetch('/products')
        .then(res => {
            if (res.status===200){
                return res.json()
            }else{
                navigate('/login')
            }
        })
        .then(data =>{
            setProducts(data)
            console.log(data)
        })
        .catch(e=>{
            console.log(e);
        })
    },[])


    useEffect(()=>{
        fetch('/categories')
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

    const handleSearch = (e) => {
        setProductName(e.target.value);
    }


    const searchGFProduct = (e) => {
        e.preventDefault()
        fetch(`/search?q=${productName}`)
          .then(res => res.json())
          .then(data => {
            // if(data.length ===0){
            //     return res.status(404).json({msg:'not found'})
            // }
            setSearchProduct(data)
            console.log(searchProduct);
          })
          .catch(e=>{
            setMsg(e.res.data.msg)
            console.log(e);
          })
      }

      const searchGFCategory = (e) => {
        e.preventDefault()
        fetch(`/search/category?q=${category}`)
          .then(res => res.json())
          .then(data => {
            if ('msg' in data) {
                setMsg(data.msg)
            } else {
                setSearchCategory(data)
                // setCategory([])
                console.log(data);
            }

          })
          .catch(e=>{
            // setMsg(e.res.data.msg)
            console.log(e);
          })
      }


      const mystyle = {
        width: '12.5vw',
        height: '6vh',
        borderRadius: '5px',
        border: '1px solid gray',
        backgroundColor: 'transparent',
        color: '#5A5A5A',
        fontSize: '16px',
        paddingLeft: '10px',
        marginTop: '2vh'
      };

    if(products.length === 0) return null

    return(
        <>
        <div>
            <TextField style={{marginTop: '5vh'}} id="outlined-basic" label="Product" name='search' variant="outlined" onChange={handleSearch}></TextField>
            <IconButton style={{marginTop: '5vh'}} aria-label="search" variant="contained" size="large" onClick={searchGFProduct}>
                <SearchIcon />
            </IconButton>
            
        </div>
        <div>
        {/* <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    name='categoryId'
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    input={<OutlinedInput label="Category" />}
                    
        
                >
                {
                        
                        categoryList ? categoryList.map(item=>{
                                return(
                                    <MenuItem value={item.id}>{item.name}</MenuItem>)
                                
                            }) : {msg}
                    }

                
                </Select>
        </FormControl>
        <IconButton aria-label="search" variant="contained" size="large" onClick={searchGFCategory}>
            <SearchIcon />
        </IconButton> */}
        </div>
      
    <div>



            <select style={mystyle} name='categoryId' value={category} onChange={(e)=>setCategory(e.target.value)}>
            {
                
                categoryList ? categoryList.map(item=>{
                        return(
                            <option value={item.id}>{item.name}</option>)
                        
                    }) : ''
            }
                
            </select>
            <IconButton aria-label="search" variant="contained" size="large" onClick={searchGFCategory}>
                <SearchIcon />
            </IconButton>
            


        </div>


        


        <div>
            <div className="list">
                {
                searchProduct ? searchProduct.map(item=>{
                    return(
                        <div key ={item.id}>
                            <p>{item.name}</p>
                            <img src= {item.url} alt="gf product" style={{height:'200px'}}/>
                            

                        </div>
                )
            }) : ''

            }
            </div>

            <div className="list">
            {
            searchCategory.length!==0 ? searchCategory.map(item=>{
                return(
                    <div key ={item.id}>
                        <p>{item.name}</p>
                        <img src= {item.url} alt="gf product" style={{height:'200px'}}/>
                    </div>
                )
            }) : ''

            }
            </div>
            <div className="list">

                {
            (searchProduct.length ===0 && searchCategory.length ===0 && products) ? products.map(item=>{
                return(
                    <div key ={item.id}>
                        <p>{item.name}</p>
                        <img src= {item.url} alt="product photo" style={{height:'240px'}}/>
                        

                    </div>
                )
            }) : ''

            }
            </div>
            

        </div>



        </>
    )
}

export default Products