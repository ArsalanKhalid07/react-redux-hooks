import React, {useState , useEffect} from 'react';

const News = () => {


 //hook state   
    const [news,newsState] = useState([])
    const [query,setquery] = useState('')    
    const [url,seturl] = useState('http://hn.algolia.com/api/v1/search?query=')
    const [loading, setloading] = useState(false)

 //function use for fetch api 
    const fetchApi = () => {
        setloading(true)
        fetch(url)
        .then(result => result.json())
        .then(data => (newsState(data.hits),setloading(false)) )
        .catch(error => console.log(error) )
    }

// hooks life cycle

   useEffect(()=>{
       fetchApi();
   },[url]) 

   const serchQuery = (e) => {
    setquery(e.target.value)
   }

const handleSearch = (e) => {
    e.preventDefault();
    seturl(`http://hn.algolia.com/api/v1/search?query=${query}`)
}

const loading_part = () => (
 loading  ? <img src="https://gcp-img.slatic.net/lazada/66d19dc9-4fd3-4b6d-8e7b-00da8504c7d8_PK-1920-200.jpg" /> : "" 
)


const form_part = () => (
    <form onSubmit={handleSearch}> 
    <input type="text" value={query} onChange={serchQuery} />
    <button>Search</button>
    </form>
)

const news_part = () => (
    news.map((n,i)=> 
        <div>
        <p key={i}>{n.title }</p>
        </div>
    )
)


    return (

        <div>
            <h2>News app </h2>
            {loading_part()}
            {form_part()}
            {news_part()}            
        </div>

    );

}


export default News;