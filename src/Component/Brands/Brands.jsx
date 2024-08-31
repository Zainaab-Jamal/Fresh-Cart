import axios from 'axios'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { BeatLoader } from 'react-spinners'

export default function Brands() {

  const [page, setPage] = useState(1)

  const [specificBrand, setSpecificBrand] = useState({})

  function getAllBrands(queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${queryData.queryKey[1]}`)
  }

  let { data, isLoading } = useQuery(['Brands', page], getAllBrands)

  console.log(data?.data.data)


  function getPageNumber(event) {

    if (event.target.getAttribute('pagenum')) {
      setPage(event.target.getAttribute('pagenum'))
      window.scrollTo(0, 0)

    } else if (event.target.innerHTML === 'First') {
      setPage(1)
      window.scrollTo(0, 0)
    } else if (event.target.innerHTML === 'Last') {
      setPage(2)
      window.scrollTo(0, 0)
    }

  }

  async function GetDetails(brandId) {
    let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
    setSpecificBrand(data?.data.data)
    console.log(data?.data.data);
  }

  return <>

    <Helmet>
      <title>Brands</title>
    </Helmet>

    {isLoading ? <div className='d-flex align-items-center justify-content-center w-100 vh-100'>
      <BeatLoader color="#009b00" />
    </div> : <div className='container mt-4'>

      <div className='row g-4'>
        {data?.data.data.map((brand) => <div key={brand._id} className='col-md-3' role='button'>

          <button type="button" onClick={() => GetDetails(brand._id)} className='border border-dark-subtle rounded-3 p-2' data-bs-toggle="modal" data-bs-target="#Modal">
            <img src={brand.image} alt='brand' className='w-100' />
            <h5 className='text-main'>{brand.name}</h5>
          </button>

          <div className="modal fade" id="Modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">{specificBrand.name}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src={specificBrand.image} alt='brand' className='w-100' height={200} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn bg-main text-light" data-bs-dismiss="modal">Close</button>

                </div>
              </div>
            </div>
          </div>

        </div>)}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center my-4">
          <li className="page-item">
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true" role='button' onClick={getPageNumber}>First</span>
            </span>
          </li>
          <li className="page-item"><span className="page-link cursor-pointer" pagenum='1' onClick={getPageNumber}>1</span></li>
          <li className="page-item"><span className="page-link cursor-pointer" pagenum='2' onClick={getPageNumber} >2</span></li>
          <li className="page-item">
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true" role='button' onClick={getPageNumber}>Last</span>
            </span>
          </li>
        </ul>
      </nav>

    </div>}









  </>
}
