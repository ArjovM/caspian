  import axios from 'axios';
import { Link } from 'react-router-dom';


const Grade = () => {
  const [course, setCourse] = useState([]);


  useEffect(() => {
    axios.get('/grade/')
      .then(response => {

        setCourse(response.data);

      })
      .catch(error => {
        console.log('The error is', error);
      });
  }, []);

  const renderGradeInGrid = () => {
    return course.reduce((rows, grade, index) => {
      // Organize subjects into rows of 4 columns
      if (index % 4 === 0) {
        rows.push([]);
      }
      const rowIndex = Math.floor(index / 4);
      rows[rowIndex].push(
        <div className="grid-item" key={grade.id}>
          <Link style={{ textDecoration: 'none' }} to={`/${grade.grade}/subjects`}>
            <div className='text-item'>{grade.grade}</div>
          </Link>
        </div>
      );
      return rows;
    }, []).map((row, index) => (
      <div className="grid-row" key={index}>{row}</div>
    ));
  };

  return (
    <div className="container">
      <div className="grid-container">
        {renderGradeInGrid()}
      </div>
    </div>
  );


};

export default Grade;