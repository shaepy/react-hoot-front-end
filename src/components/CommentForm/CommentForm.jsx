import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styles from "./CommentForm.module.css";
import Icon from "../Icon/Icon";
import * as hootService from "../../services/hootService";

const CommentForm = ({ handleAddComment }) => {
  const navigate = useNavigate();
  const { hootId, commentId } = useParams();
  // if commentId is undefined, it is a NEW comment.
  console.log("hootId:", hootId, "commentId:", commentId);

  const [formData, setFormData] = useState({ text: "" });

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(
        hootData.comments.find((comment) => comment._id === commentId)
      );
    };
    if (hootId && commentId) fetchHoot();
  }, [hootId, commentId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hootId && commentId) {
      await hootService.updateComment(hootId, commentId, formData);
      navigate(`/hoots/${hootId}`);
    } else {
      handleAddComment(formData);
    }
    setFormData({ text: "" });
  };

  if (hootId && commentId)
    return (
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Edit Comment</h1>
          <label htmlFor="text-input">Your comment:</label>
          <textarea
            required
            type="text"
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </main>
    );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">
        <Icon category="Create" />
      </button>
    </form>
  );
};

export default CommentForm;
