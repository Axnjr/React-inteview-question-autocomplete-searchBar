import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApi(url) {

	const [returnData,setReturnData] = useState([])

    useEffect(() => {
		(
			async() => { 
				const temp = await axios.get(url)
				setReturnData(temp.data)
			}
		)();
	} , [url])
    
	return [ returnData , setReturnData ];
}
