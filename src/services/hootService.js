import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;

const index = async () => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error("Error something went wrong fetching all hoots");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const show = async (hootId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${hootId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error(`Error something went wrong fetching hoot ${hootId}`);
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const create = async (hootFormData) => {
  try {
    const res = await axios.post(BASE_URL, hootFormData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error(`Error something went wrong with creating hoot`);
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// deleteHoot
const deleteHoot = async (hootId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${hootId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error(
        `Error something went wrong with deleting hoot ${hootId}`
      );
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const update = async (hootId, hootFormData) => {
  try {
    const res = await axios.put(`${BASE_URL}/${hootId}`, hootFormData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.data) {
      throw new Error(
        `Error something went wrong with updating hoot ${hootId}`
      );
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// create comment
const createComment = async (hootId, commentFormData) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/${hootId}/comments`,
      commentFormData,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (!res.data) {
      throw new Error(`Error something went wrong with creating comment`);
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// delete comment
const deleteComment = async (hootId, commentId) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/${hootId}/comments/${commentId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (!res.data) {
      throw new Error(
        `Error something went wrong with deleting comment ${commentId}`
      );
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// update comment
const updateComment = async (hootId, commentId, commentFormData) => {
  try {
    console.log("hootService updateComment called");
    const res = await axios.put(
      `${BASE_URL}/${hootId}/comments/${commentId}`,
      commentFormData,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (!res.data) {
      throw new Error(
        `Error something went wrong with updating comment ${commentId}`
      );
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export {
  index,
  show,
  create,
  createComment,
  deleteHoot,
  update,
  deleteComment,
  updateComment,
};
