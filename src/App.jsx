import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {

	const [selItem, setSelItem] = useState(null)
	const [data, setData] = useState([])

	async function ApiSimulator() {
		return await axios.get("https://random-data-api.com/api/users/random_user?size=50")
	}

	useEffect(() => {
		if (selItem) {
			ApiSimulator()
				.then(res => {
					setData(res.data.filter(ele => ele.first_name.includes(selItem)))
				})
				.catch(err => {
					alert("Unexpected error occured !");
					console.log(err);
				});
		}
	}, [selItem])

	return (
		<div>
			<input placeholder='Type names ...' type="text" onChange={(e) => { setSelItem(e.target.value) }}></input>
			<div>
				{
				!selItem ?
					<div>Search Results appear here</div> :
					<div>
						{
							!data.length<=0 ?
								<div>
									{
										data.map((ele, id) => {
											return (
												<li key={id.toString()}>{ele.first_name}</li>
											)
										})
									}
								</div>
								:
								<div>No results found</div>
						}
					</div>
				}
			</div>
		</div>
	)
}
