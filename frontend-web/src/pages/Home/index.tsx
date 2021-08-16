import Navbar from 'components/Navbar';
import ButtonIcon from 'components/ButtonIcon';
import { ReactComponent as MainImg } from 'assets/images/main-vectorized-img.svg';
import './style.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="base-card home-card">
          <div className="home-content-container">
            <div>
              <h1>Get to Know the Best Online Product Catalog</h1>
              <p>
                We'll help you find the Best Products Available at the Market
              </p>
            </div>
            <ButtonIcon />
          </div>

          <div className="home-image-container">
            <MainImg />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
