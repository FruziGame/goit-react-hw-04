import axios from "axios"
import { RotatingLines } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';


import css from "./App.module.css"
import SearchBar from "./components/SearchBar/SearchBar"
import ImageGallery from "./components/ImageGallery/ImageGallery"
import ImageModal from "./components/ImageModal/ImageModal";

import { useState } from "react"





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






  const myApiKey = "28B1jJya0_5xgiojIju_h9eqIt0k8X8PK5RSk-HISFk"
  axios.defaults.baseURL = "https://api.unsplash.com/search/photos/"
  axios.defaults.headers.common["Authorization"] = `Client-ID ${myApiKey}`;

  const handleSubmit = async (input)=> {

    try {

      setError(false)
      setLoading(true)

      setData({
        images: [],
        total: 0,
        total_pages: 0,
      });
      
      const response = await  axios.get("", {
        params: {
          query: input,
          per_page: 15,
        }
      })
      setData(prevData => ({
        ...prevData,
        images: [...prevData.images, ...response.data.results],
        total: response.data.total,
        total_pages: response.data.total_pages,
      }));

      if (response.data.results.length === 0) {
        toast.error("We couldn’t find any images matching your search. Try using different keywords.");
      }

      setInput(input)
      setPage(2);

      } catch (error) {
        setError(true); 
        toast.error("Oops! something went wrong, please try again later")

      }
      finally {
        setLoading(false)
    }
  }


  const loadMore = async () => {

    try {

      setError(false)
      setLoading(true)

      if (page > data.total_pages) {
        throw new Error("No more pages");

    }

      const response = await  axios.get("", {
        params: {
          query: input,
          per_page: 4,
          page: page,
        }
      })
      setData(prevData => ({
        ...prevData,
        images: [...prevData.images, ...response.data.results],
        total: response.data.total,
        total_pages: response.data.total_pages,
      }));

      setPage((prevPage) => prevPage + 1);


    } catch (error) {
      setError(true); 
      toast.error("No more photos available for this search.")
    }
    finally {
      setLoading(false)
    }
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
