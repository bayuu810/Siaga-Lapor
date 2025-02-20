import { BACKEND_API_ENDPOINT } from "@/constant/utils";
import { setLoading } from "@/redux/authSlice";
import { setLokasi } from "@/redux/lokasiSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllLokasi = () => {
    const dispatch = useDispatch()
useEffect(() => {
    const fecthAllLokasi= async () => {
        try {
            const res = await axios.get(`${BACKEND_API_ENDPOINT}/get/lokasi`, {withCredentials: true});
            if (res.data.success) {
                dispatch(setLokasi(res.data.data))
            }
        }catch (error) {
            console.log(error)      
        }
    }
    fecthAllLokasi()
    }, [dispatch])

}

export default useGetAllLokasi