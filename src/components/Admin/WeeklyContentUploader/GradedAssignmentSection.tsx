// GradedAssignmentSection.tsx
import React from 'react';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { AssignmentContentEditor } from '../QuestionEditors/QuestionEditor';
import { EnhancedAssignment } from './PracticeAssignmentSection';

// Graded Assignment Section
interface GradedAssignmentSectionProps {
  gradedAssignments: EnhancedAssignment[];
  setGradedAssignments: React.Dispatch<React.SetStateAction<EnhancedAssignment[]>>;
}

export function GradedAssignmentSection({ 
  gradedAssignments, 
  setGradedAssignments 
}: GradedAssignmentSectionProps) {
  
  const handleAddGradedAssignment = () => {
    setGradedAssignments([
      ...gradedAssignments,
      {
        title: '',
        deadline: '',
        is_coding_assignment: false,
        description: '',
        assignment_content: [],
      },
    ]);
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Graded Assignments</h3>
        <button
          onClick={handleAddGradedAssignment}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Icon icon={plus} size={16} /> <span className="ml-1">Add Assignment</span>
        </button>
      </div>
      
      {gradedAssignments.map((assignment, index) => (
        <AssignmentContentEditor
          key={index}
          index={index}
          assignment={assignment}
          assignments={gradedAssignments}
          setAssignments={setGradedAssignments}
          type="Graded"
        />
      ))}
      
      {gradedAssignments.length === 0 && (
        <p className="text-gray-500 italic text-center py-8">No graded assignments added yet.</p>
      )}
    </div>
  );
}