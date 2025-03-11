import { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { messageCircle } from 'react-icons-kit/feather/messageCircle';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCourses, fetchDeadlines, fetchStudentData } from '../../services/students';
import DeadlineItem from '../ui/DeadlineItem';
import ChatOverlay from '../ui/ChatOverlay';
import Sidebar from './Sidebar';

interface Course {
  id: number;
  title: string;
  category: string;
  icon: string;
  description: string;
}

interface Deadline {
  id: number;
  course_title: string;
  assignment_no: number;
  deadline: string;
  status: 'Pending' | 'Submitted';
}

interface StudentData {
  id: string;
  first_name: string | " ";
  last_name: string | " "
}

export default function StudentDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [studentData, setStudentData] = useState<StudentData>()
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    // Fetch courses and deadlines from the backend
    const fetchData = async () => {
      try {
        const coursesData = await fetchCourses();
        const deadlinesData = await fetchDeadlines();
        const studentData = await fetchStudentData()
        setCourses(coursesData);
        setDeadlines(deadlinesData);
        setStudentData(studentData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);


  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
      />

      {/* Main Content */}
      <div className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium text-gray-600">{studentData?.first_name} {studentData?.last_name}</span>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsChatOpen(true)}
            >
              <Icon icon={messageCircle} size={24} />
            </button>
          </div>
        </header>

        {/* Courses Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link 
                to={`/student/course/${course.id}`}
                key={course.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">
                    {course.category}
                  </span>
                  <div className="text-4xl mb-4">{course.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <span className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center">
                    View Course
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Deadlines Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Deadlines</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignment No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deadlines.map((deadline) => (
                  <DeadlineItem
                    key={deadline.id}
                    course_title={deadline.course_title}
                    assignment_no={deadline.assignment_no}
                    deadline={deadline.deadline}
                    status={deadline.status}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Chat Overlay */}
      <ChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}