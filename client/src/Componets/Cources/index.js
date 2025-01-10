import React from 'react';
import './index.css';

const Cources = () => {
  const courses = [
    { id: 1, name: 'React for Beginners', price: '$50', duration: '4 weeks' },
    { id: 2, name: 'Advanced JavaScript', price: '$70', duration: '6 weeks' },
    { id: 3, name: 'Web Development Bootcamp', price: '$100', duration: '12 weeks' },
    { id: 4, name: 'Data Science with Python', price: '$120', duration: '8 weeks' },
    { id: 5, name: 'Advanced JavaScript', price: '$70', duration: '6 weeks' },
    { id: 6, name: 'Web Development Bootcamp', price: '$100', duration: '12 weeks' },
  ];

  return (
    <>
    <div className="home-course">
      <h2>Available Courses</h2>
      <table className="home-course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.price}</td>
              <td>{course.duration}</td>
              <td><button className="home-course-buy-btn">Enroll Now </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Cources;