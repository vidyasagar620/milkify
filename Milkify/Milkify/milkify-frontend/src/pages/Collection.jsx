import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../styles/Collection.css";

const Collection = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/collections");
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <section className="collection-header">
          <h1>Our Collections</h1>
          <p>Explore our premium dairy collections</p>
        </section>

        <section className="collection-grid">
          {collections.length === 0 ? (
            <p className="loading-text">Loading collections...</p>
          ) : (
            collections.map((item) => (
              <div key={item.id} className="collection-card">
                <img src={item.image_url} alt={item.name} className="collection-img" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Collection;
