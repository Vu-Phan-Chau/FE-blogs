import "../assets/BlogPage.scss"
import HeaderComponent from "../components/HeaderComponent";
// import Webcam from "react-webcam";

const HomePage = () => {
  // const WebcamComponent = () => <Webcam />;

  return (
    <div className="home">
      <HeaderComponent />
      {/*<WebcamComponent />*/}
    </div>
  );
};

export default HomePage;