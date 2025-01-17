import { useState } from "react";
import "./index.css";

// Popup Form Component
const CourseForm = ({ mode, course, onSave, onClose }) => {
    const [formData, setFormData] = useState(
      course || {
        name: "",
        startDate: "",
        endDate: "",
        time: "",
        price: "",
        teacher: ""
      }
    );
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };
  
    return (
      <div className="course-form">
        <h2>{mode === "add" ? "Add New Course" : "Edit Course"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Course Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Teacher:
            <input
              type="text"
              name="teacher"
              value={formData.teacher}
              onChange={handleInputChange}
              required
            />
          </label>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default CourseForm