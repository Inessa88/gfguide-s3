
import React, {useRef} from 'react';
import './FileUploader.css';


const FileUploader = (props) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1000000000) {  
          props.Error({ error: "File size cannot exceed more than 1MB" });}
        else { props.Success({file});} };

    return (
        <div className="form-group files" >
            <h4>Upload Your File </h4>
            <input type="file" class="form-control" multiple="" onChange={handleFileInput}/>
            {/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary">Add</button> */}
        </div>
    )
}

export default FileUploader

