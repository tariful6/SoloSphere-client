
import Banner from "./Banner/Banner";
import TabCategories from "./TabCategories/TabCategories";

const Home = () => {

    
    return (
        <div>
            <div className=" container mx-auto px-4 ">
              <Banner></Banner>
              <TabCategories ></TabCategories>
            </div>
        </div>
    );
};

export default Home;