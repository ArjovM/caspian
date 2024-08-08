import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const AddReport = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const API_URL = 'http://localhost:8000/';
    const [error, setError] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [term, setTerm] = useState([]);
    const [open, setOpen] = useState(false);
    const [marks, setMarks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        studentsApi();
        grade();
        course();
    }, []);

    const studentsApi = async () => {
        try {
            const response = await axios.get(`${API_URL}students/`);
            setStudents(response.data);
        } catch (error) {
            setError(error.response ? error.response.data : error);
            console.error('Student error:', error.response ? error.response.data : error);
        }
    };

    const grade = async () => {
        try {
            const response = await axios.get(`${API_URL}grade/`);
            setSelectedGrade(response.data);
        } catch (error) {
            setError(error.response ? error.response.data : error);
            console.error('Grade error:', error.response ? error.response.data : error);
        }
    };

    const course = async () => {
        try {
            const response = await axios.get(`${API_URL}course/`);
            setSelectedCourse(response.data);
        } catch (error) {
            setError(error.response ? error.response.data : error);
            console.error('Course error:', error.response ? error.response.data : error);
        }
    };

    useEffect(() => {
        axios.get('/term/')
            .then(response => {
                setTerm(response.data);
            })
            .catch(error => {
                console.log('Term error:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('/subjecta/')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.log('Subject error:', error);
            });
    }, []);

    const customStyles = {
        content: {
            height: '400px',
        },
    };

    const handleStudentChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const student = selectedOption.getAttribute('value');
        const course = selectedOption.getAttribute('data-course');
        const grade = selectedOption.getAttribute('data-grade');
        setSelectedStudent({ course, grade, student });
    };

    const handleTermChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const term = selectedOption.getAttribute('value');
        setSelectedTerm({ term });
    };

    const handleSubjectChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const subject = selectedOption.getAttribute('value');
        setSelectedSubject({ subject });
    };

    const reportCard = async (student, course, subject, grade, term, marks) => {
        try {
            const response = await axios.post(`${API_URL}addreport/`, { student, course, subject, grade, term, marks });
            return response.data;
        } catch (error) {
            console.error('Report error:', error.response ? error.response.data : error);
            throw error;
        }
    };

    const addReportCard = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        try {
            await reportCard(selectedStudent.student, selectedStudent.course, selectedSubject.subject, selectedStudent.grade, selectedTerm.term, marks);
            console.log("Added ReportCard successfully");
        } catch (err) {
            console.error("Error during Adding ReportCard:", err);
            setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
        }
    };

    console.log(selectedStudent, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    return (
        <div className="book-resources-container">
            <h1>Add a ReportCard</h1>
            {user && user.user_type === "1" &&
                <div><button className="add-button" onClick={handleOpen}>Add ReportCard</button></div>}

            <Modal isOpen={open} style={customStyles}>
                <>
                    <h1>Add ReportCard</h1>
                    <form>
                        <select value={selectedStudent ? selectedStudent.course : ''} onChange={handleStudentChange}>
                            <option value="" disabled>Select Student</option>
                            {students.map((student) => (
                                <option
                                    key={student.student}
                                    value={student.student}
                                    data-course={student.course}
                                    data-grade={student.grade}
                                >
                                    {student.name}
                                </option>
                            ))}
                        </select>
                        <select value={selectedTerm} onChange={handleTermChange}>
                            <option value="" disabled>Select Term</option>
                            {term.map((t) => (
                                <option
                                    key={t.id}
                                    value={t.id}
                                >
                                    {t.Term}
                                </option>
                            ))}
                        </select>

                        <div>
                            {selectedStudent && selectedCourse.filter((course) => course.id === parseInt(selectedStudent.course)).map((c) => (
                                <div key={c.id}>
                                    {c.course_name}
                                </div>
                            ))}
                        </div>

                        <div>
                            {selectedStudent && selectedGrade.filter((grade) => grade.id === parseInt(selectedStudent.grade)).map((g) => (
                                <div key={g.id}>
                                    {g.grade}
                                </div>
                            ))}
                        </div>

                        <div>
                            {selectedStudent && selectedCourse && selectedGrade && (
                                <select value={selectedSubject} onChange={handleSubjectChange}>
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.filter((subject) => subject.course === parseInt(selectedStudent.course) && subject.grade === parseInt(selectedStudent.grade)).map((sub) => (
                                        <option
                                            key={sub.SubjectID}
                                            value={sub.SubjectID}
                                        >
                                            {sub.SubjectName}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <input
                            type="text"
                            placeholder="Marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            className="input-field"
                        />

                        <div className="button-group">
                            <button className="submit-button" onClick={addReportCard}>Add</button>
                            <button className="close-button" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </>
            </Modal>
        </div>
    );
};

export default AddReport;
