export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  collegeName: string;
  qualification: string;
  imageLabel: string;
}

// Left empty until verified faculty list is provided by the client
export const facultyData: FacultyMember[] = [];
