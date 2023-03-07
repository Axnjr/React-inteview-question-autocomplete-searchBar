import { useState , useEffect, Suspense } from 'react'
import axios from 'axios'
import useApi from './useApi'

export default function App() {

	const url = "https://random-data-api.com/api/users/random_user?size=50"
	const [query1,setQuery1] = useState("")
	const [query2,setQuery2] = useState("")
	const [fetchedData,setFetchedData] = useState([])
	const [fetchedData2,setFetchedData2] = useApi(url)

	function FetchedResults(){
		return(
			<div>
			{
				!fetchedData.length<1 ? 
				<div>
				{
					fetchedData.map((ele,id) => <li key={id}>{ele.first_name}</li>)
				}
				</div>
				:
				<h1>No results found</h1>
			}
			</div>
		)
	}

	async function FetchDataFromApi(){
		return await axios.get("https://random-data-api.com/api/users/random_user?size=50")
	}

	useEffect(() => {
		if(fetchedData2){
			setFetchedData(fetchedData2.filter(items => items.first_name.includes(query1)))
		}
	} , [query1])

	useEffect(() => {
		FetchDataFromApi()
		.then(res => {
			setFetchedData(res.data.filter(items => items.first_name.includes(query2)))
		})
		.catch(err => {
			console.log(err)
		})
	} , [query2])

	function Loading(){
		return <h1>Loading...</h1>
	}

  return (
	<div>
		<input placeholder='Already present results..' type="text" onChange={(e) => { setQuery1(e.target.value) }} ></input>
		<input placeholder='Fresh results..' type="text" onChange={(e) => { setQuery2(e.target.value) }} ></input>

		{
			query1 || query2 ? 
			<FetchedResults/>
			:
			<h2>All Search results appear here. Search from one input at a time</h2>
		}
	</div>
  )
}