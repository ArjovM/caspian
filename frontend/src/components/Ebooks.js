import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import saveAs from 'file-saver';

const BookResourcesList = () => {
    const [bookResourcesData, setBookResourcesData] = useState([]);
    const [title, setTitle] = useState([]);
    const [author, setAuthor] = useState([]);
    const [file, setFile] = useState([]);
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const API_URL = 'http://localhost:8000/';
    const [error, setError] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [input, setInput] = useState('') // For input
    const [isdisabled, setIsDisabled] = useState(false) // For button

    // when input is changing this function will get called
    const onChange = (e) => {
        setInput((prevState) => (e.target.value))
        if (e.target.value.trim().length < 1) {   // Checking the length of the input
            setIsDisabled(true)  // Disabling the button if length is < 1
        } else {
            setIsDisabled(false)
        }
    }

    const ebook = async (title, author, file, teacherName) => {
        try {
            const response = await axios.post(`${API_URL}addebooks/`,
                { title, author, file, teacherName },
            );
            return response.data
        } catch (error) {
            console.error('Ebook error:', error.response ? error.response.data : error);
            throw error;
        }
    }

    const addEbook = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const newEbook = await ebook(title, author, file, user.username);
            setBookResourcesData(prevBookResourceData => [newEbook, ...prevBookResourceData]); // Add new notice to the top of the list
            setDescription(''); // Clear the input field
            console.log("EBook added successfully");
        } catch (err) {
            console.error("Error during adding ebook:", err);
            setError(err.response ? err.response.data.error : 'An unexpected error occurred.');
        }
    };

    const customStyles = {
        content: {
            height: '400px',
        },
    };

    const downloadPdf = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/bookresources/",
                {
                    responseType: "blob",
                }
            );

            // Create a Blob from the response data
            const pdfBlob = new Blob([response.data], { type: "document" });

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(pdfBlob);

            // Create a temporary <a> element to trigger the download
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute(
                "download",
                `bill`
            ); // Set the desired filename for the downloaded file

            // Append the <a> element to the body and click it to trigger the download
            document.body.appendChild(tempLink);
            tempLink.click();

            // Clean up the temporary elements and URL
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };



    useEffect(() => {
        axios.get('http://localhost:8000/bookresources/')
            .then(response => {
                setBookResourcesData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <>
            <div className="book-resources-container">
                <h1>List of E-books</h1>{user && (user.user_type === "2" || user.user_type === "1") && <div><button class="add-button" onClick={handleOpen}>Add E-Books</button></div>}
                <table className="book-resources-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Teacher</th>
                            <th>File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookResourcesData.map(bookResources => (
                            <tr key={bookResources.ebooksID}>
                                <td>{bookResources.title}</td>
                                <td>{bookResources.author}</td>
                                <td>{bookResources.teacherName}</td>
                                <button onClick={downloadPdf}>Download</button>
                                {/* <td><a href={bookResources.file}>Download File</a></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={open} style={customStyles}
                >
                    <>
                        <h1>Add a E-Book</h1>
                        <form onSubmit={addEbook}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="input-field"
                            />
                            <input
                                type="file"
                                id='my'
                                onChange={(e) => setFile(e.target.value)}
                                value={file}
                                name="myfile"
                            />
                            <div className="button-group">
                                <button type="submit" class="submit-button">Add</button>
                                <button onClick={handleClose} disabled={isdisabled} class="close-button">Close</button>
                            </div>
                        </form>
                    </>
                </Modal>
            </div>
        </>
    );
};

export default BookResourcesList;
