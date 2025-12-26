import { useState, useEffect } from "react";
import Input from "../common/Input/Input.jsx";
import Button from "../common/Button/Button.jsx";

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    bookName: "",
    desc: "",
    authorName: "",
    publishDate: "",
    pages: "",
    genre: "",
    image: null,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        bookName: book.bookName || "",
        desc: book.desc || "",
        authorName: book.authorName || "",
        publishDate: book.publishDate?.split("T")[0] || "",
        pages: book.pages || "",
        genre: book.genre || "",
        image: null,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Book Name"
        name="bookName"
        value={formData.bookName}
        onChange={handleChange}
        required
      />
      <div className="input-group">
        <label className="input-label">Description</label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          className="input"
          rows="4"
        />
      </div>
      <Input
        label="Author Name"
        name="authorName"
        value={formData.authorName}
        onChange={handleChange}
        required
      />
      <Input
        label="Publish Date"
        type="date"
        name="publishDate"
        value={formData.publishDate}
        onChange={handleChange}
      />
      <Input
        label="Pages"
        type="number"
        name="pages"
        value={formData.pages}
        onChange={handleChange}
      />
      <Input
        label="Genre"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
      />
      {!book && (
        <Input
          label="Cover Image"
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />
      )}
      <div className="flex gap-2 mt-3">
        <Button type="submit" fullWidth>
          {book ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
