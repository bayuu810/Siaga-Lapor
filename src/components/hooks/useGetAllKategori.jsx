import { BACKEND_API_ENDPOINT } from '@/constant/utils'
import { setKategori } from '@/redux/kategoriSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllKategori = () => {
    const dispatch = useDispatch()
    // const {kategori} = useSelector((store)=>store.kategori)
   useEffect(()=> {
    const fetchAllKategori = async () => {
        try {
            const res = await axios.get(`${BACKEND_API_ENDPOINT}/get/kategori`, {withCredentials: true});
            if (res.data.success) {
                dispatch(setKategori(res.data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchAllKategori()
   },[dispatch])
}

export default useGetAllKategori