import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import { Helmet } from 'react-helmet'

export default function Home() {


  return <>

    <MainSlider />

    <CategorySlider />

    <Products />

    <Helmet>
      <title>Home</title>
    </Helmet>

  </>
}
