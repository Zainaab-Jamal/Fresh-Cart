import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import style from './SubCategories.module.css'
import { BeatLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function SubCategories() {

    let { id } = useParams()

    function getSubCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    }

    function getSpecificCategory() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    }

    let { data, isLoading } = useQuery('specificCategory', getSpecificCategory)

    let subCategoryRes = useQuery('subCategories', getSubCategories)

    return <>

        <Helmet>
            <title>SubCategories</title>
        </Helmet>

        {isLoading ? <div className='d-flex align-items-center justify-content-center w-100 vh-100'>
            <BeatLoader color="#009b00" />
        </div> : <div className='container d-flex align-items-center justify-content-center mt-4'>
            <div className='subCategories bg-body-secondary p-5 subCategoriesShadow'>
                <div className='row align-items-center justify-content-center g-4'>
                    <div className='col-md-4'>
                        <img src={data?.data.data.image} alt='category' className='w-100' height={400} />
                    </div>

                    <div className='col-md-8'>
                        <h4 className='fw-bold'>{data?.data.data.name}</h4>
                        <h5 className='text-secondary'>Sub Categories:</h5>
                        {subCategoryRes?.data?.data.data.map((subCategory) => <span className={style.subCategories} key={subCategory._id}>{subCategory.name}</span>)}
                    </div>
                </div>
            </div>
        </div>}
    </>
}
