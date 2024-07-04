import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase"
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice.js"
import { useDispatch } from "react-redux"
export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const[fileUploadError, setFileUploadError] = useState(false)
  const[formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const handleFormData = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  },[file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setFilePerc(Math.round(progress))
    },
    (error) => {
      console.log('file upload error', error)
      setFileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) => setFormData({...formData, avatar : downloadURL})
      )
    }
  );
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center my-7 font-semibold'>Profile</h1>
      <form className="flex flex-col gap-4"  onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0]) } ref={fileRef} hidden accept="image/*" />
        <img src={formData.avatar || currentUser.avatar} onClick={() => fileRef.current.click()} alt="profile" className="mt-2 w-24 h-24 rounded-full object-cover self-center cursor-pointer" />
        <p className="text-sm text-center">
          {fileUploadError ? <span className="text-red-700">
            Error Image Upload(Image must be less than 2 mb)
          </span> : filePerc > 0 && filePerc < 100 ? <span className="text-slate-700">
            {`Uploading ${filePerc}%`}
          </span>: filePerc === 100 ? <span className="text-green-700">Image successfully uploaded!</span> : ""}
        </p>
        <input onChange={handleFormData} defaultValue={currentUser.username} type="text" id='username' placeholder='Username' className='p-3 rounded-lg border' />
        <input onChange={handleFormData} defaultValue={currentUser.email} type="text" id='email' placeholder='Email' className='p-3 rounded-lg border' />
        <input onChange={handleFormData}  type="password" id='password' placeholder='Password' className='p-3 rounded-lg border' />
        <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase disabled:opacity-80">update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer ">Delete account</span>
        <span className="text-red-700 cursor-pointer ">Sign out</span>
      </div>
    </div>
  )
}
