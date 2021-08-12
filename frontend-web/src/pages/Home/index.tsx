import Navbar from 'components/Navbar';
import { ReactComponent as MainImg } from 'assets/images/main-vectorized-img.svg'
import './style.css'

const Home = () => {
    return (
    <>
        <Navbar/>
        <div className="home-container">

            <div className="home-card">

                <div className="home-content-container">

                    <h1>Get to Know the Best Online Product Catalog</h1>

                </div>

                <div className="home-image-container">

                    <MainImg/>

                </div>

            </div>    

        </div>
    </>
    );
  };
  
  export default Home;