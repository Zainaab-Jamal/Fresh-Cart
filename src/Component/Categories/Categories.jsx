import axios from 'axios'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

export default function Categories() {

  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let { data, isLoading } = useQuery('categories', getAllCategories)

  return <>

    <Helmet>
      <title>Categories</title>
    </Helmet>

    {isLoading ? <div className='d-flex align-items-center justify-content-center w-100 vh-100'>
      <BeatLoader color="#009b00" />
    </div> :

      <div className="container mt-3">
        <div className='row g-4'>
          {data?.data.data.map((category) => <div key={category._id} className='col-md-3' role='button'>
            <Link to={`/categories/${category._id}`}>
              <div className='border border-dark-subtle rounded-3 p-2'>
                <img src={category.image} alt='category' className='w-100' height={280} />
                <h6 className='text-main text-center mt-2'>{category.name}</h6>
              </div>
            </Link>
          </div>)}

        </div>
      </div>
    }


  </>
}
