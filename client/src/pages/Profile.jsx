import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase"
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice.js"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

export default function Profile() {
  const {currentUser, loading} = useSelector(state => state.user)
  const {error} = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [isUserUpdated, setIsUserUpdated] = useState(false)
  const dispatch = useDispatch()


  const handleFormData = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }
  // console.log(currentUser);

  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  },[file])

  const handleFileUpload =  (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    // const storageRef = ref(storage, fileName)
    // const uploadTask = uploadBytesResumable(storageRef, file)

    // uploadTask.on('state_changed', (snapshot) => {
    //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //   setFilePerc(Math.round(progress))
    // },
    // (error) => {
    //   console.log('file upload error', error)
    //   setFileUploadError(true)
    // },
    // () => {
    //   getDownloadURL(uploadTask.snapshot.ref).then(
    //     (downloadURL) => setFormData({...formData, avatar : downloadURL})
    //   )
    // }
  // );
  let  base64String ;
  const reader = new FileReader()
  reader.onload = async function(event) {
     base64String = event.target.result.split(',')[1];try {
      // Validate the base64 string
      if (!base64String) {
          throw new Error('Invalid base64 string');
      }
      
      const response = await fetch('https://api.imgbb.com/1/upload?expiration=15552000&key=7fe2951ad3927e7e36eb19fe99b207c7', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
              image: base64String
          })
      });

      const data = await response.json();
      if (data.success) {
      //  dispatch()
          setFormData({ ...formData, avatar: data.data.url });
          setFilePerc(100); // Set progress to 100% when upload is complete
      } else {
          setFileUploadError(true);
          console.error('Image upload failed:', data);
      }
  } catch (error) {
      setFileUploadError(true);
      console.error('Image upload error:', error);
  }

  }
  reader.readAsDataURL(file);

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
      setIsUserUpdated(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {

   try {
    dispatch(deleteUserStart())
     let res = await fetch(`api/user/delete/${currentUser._id}`, {
      method:'DELETE'
     })

     let data = await res.json()
     if(data.success === false){
      dispatch(deleteUserFailure(data.message))
      return
     }
     dispatch(deleteUserSuccess(data))

   } catch (error) {
    dispatch(deleteUserFailure(error.message))
   }
  }
  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch(`api/auth/signout`,{method:"POST"})
      const data = await res.json()
      if(data.success === false){
        dispatch(signOutUserFailure(data.message))
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      signOutUserFailure(error.message)
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
        <button type="submit" disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase disabled:opacity-80">{loading ? 'Loading...':'update'}</button>
       <Link to={'/create-listing'} className="bg-green-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95">
            Create Listing
       </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer ">Delete account</span>
        <span className="text-red-700 cursor-pointer " onClick={handleSignout}>Sign out</span>
      </div>
      {error && <p className="text-red-700 mt-5 text-center">{error}</p>}
      {isUserUpdated && <p className="text-green-700 mt-5 text-center">User updated successfully!</p>}
    </div>
  )
}
