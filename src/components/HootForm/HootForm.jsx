import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./HootForm.module.css";
import * as hootService from "../../services/hootService";

const initialState = {
  title: "",
  text: "",
  category: "News",
};

const HootForm = ({ handleAddHoot, handleUpdateHoot }) => {
  // if hootId is undefined, not an edit route.
  const { hootId } = useParams();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(hootData);
    };
    if (hootId) fetchHoot();
    // clean up function to reset state if hootId is undefined
    return () => setFormData(initialState);
  }, [hootId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hootId) handleUpdateHoot(hootId, formData);
    else handleAddHoot(formData);
  };

  return (
    <main className={styles.container}>
      <h1>{hootId ? "Edit Hoot" : "New Hoot"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}>
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <button type="submit">{hootId ? "UPDATE" : "SUBMIT"}</button>
      </form>
    </main>
  );
};

export default HootForm;
