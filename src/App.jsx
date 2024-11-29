import axios from "axios"
import { RotatingLines } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';


import css from "./App.module.css"
import SearchBar from "./components/SearchBar/SearchBar"
import ImageGallery from "./components/ImageGallery/ImageGallery"
import ImageModal from "./components/ImageModal/ImageModal";

import { useEffect, useState } from "react"





function App() {

  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal(event) {
    const photoForModal = event.target.dataset.full;
    setDataModal(photoForModal)
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  const [dataModal, setDataModal] = useState("")

  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(true)


  const [input, setInput] = useState("")
  const [page, setPage] = useState(1)

  const [data, setData] = useState({
    images: [],
    total: 0,
    total_pages: 0,
  });






  const myApiKey = "hBjqH2luvWaYwVg60gWls-uptvg6osKZSiF3soX_8W8"
  axios.defaults.baseURL = "https://api.unsplash.com/search/photos/"
  axios.defaults.headers.common["Authorization"] = `Client-ID ${myApiKey}`;

  const handleSubmit = (input) => {

    setInput(input)
    setPage(1)

    setData({
      images: [],
      total: 0,
      total_pages: 0,
    });
  }

  useEffect(() => {

    if (input === "") {
      return
    }

    async function fetchPhotos(input,page) {

      try {

        setError(false)
        setLoading(true)
  
        const response = await  axios.get("", {
          params: {
            query: input,
            per_page: 15,
            page: page,
          }
        })


        if (page > response.data.total_pages) {
          toast.error("No more photos available for this search.");
          return; 
        }

        setData(prevData => ({
          ...prevData,
          images: [...prevData.images, ...response.data.results],
          total: response.data.total,
          total_pages: response.data.total_pages,
        }));
  
        } catch (error) {
          setError(true); 
          toast.error("Oops! something went wrong, please try again later")
  
        }
        finally {
          setLoading(false)
      }
    }

    fetchPhotos(input,page)
  },[input,page])


  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  }


  return (
    <>
      <SearchBar onSubmit={handleSubmit}/>
      {data.images.length > 0 && <ImageGallery images={data.images} getFullImage={openModal} />}
      {loading && (<div className={css.loading}> <RotatingLines  strokeColor="black"   /> </div> )}
   
      { error && <Toaster />}
      {data.images.length > 0 &&   <button className={css.btn} onClick={loadMore}>Load more</button >}
      <ImageModal open={openModal} close={closeModal} isOpen={modalIsOpen} data={dataModal} />
      
    </>
  )
}

export default App
