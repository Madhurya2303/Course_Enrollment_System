Enrollment.delete_all
Course.delete_all
Instructor.delete_all
User.where(role: 'student').delete_all

ActiveRecord::Base.connection.execute("ALTER TABLE instructors AUTO_INCREMENT = 1;")
ActiveRecord::Base.connection.execute("ALTER TABLE courses AUTO_INCREMENT = 1;")

instructor_names = [
  "John Smith", "Alice Johnson", "Robert Brown", "Emily Davis",
  "Michael Wilson", "Sarah Taylor", "David Anderson", "Laura Martinez"
]

instructors = instructor_names.map.with_index(1) do |name, i|
  Instructor.create!(
    name: name,
    email: "instructor#{i}@example.com",
    password: "password123",
    password_confirmation: "password123",
    instructor_code: "i#{i}"
  )
end

Course.create!([
  {
    title: "Introduction to Programming",
    description: "Learn the basics of Python and programming concepts.",
    credit_hours: 3,
    instructor: instructors[0],
    created_by: 1,
    capacity: 1
  },
  {
    title: "Data Structures",
    description: "Understand linked lists, trees, and graphs in depth.",
    credit_hours: 4,
    instructor: instructors[1],
    created_by: 1,
    capacity: 3
  },
  {
    title: "Web Development",
    description: "HTML, CSS, JavaScript, and full-stack concepts.",
    credit_hours: 3,
    instructor: instructors[2],
    created_by: 1,
    capacity: 3
  },
  {
    title: "Operating Systems",
    description: "Memory management, process scheduling, and system design.",
    credit_hours: 4,
    instructor: instructors[3],
    created_by: 1,
    capacity: 3
  },
  {
    title: "Computer Networks",
    description: "TCP/IP, routing, switching, and internet architecture.",
    credit_hours: 3,
    instructor: instructors[4],
    created_by: 1,
    capacity: 3
  },
  {
    title: "Database Management",
    description: "SQL, ER models, normalization, and transactions.",
    credit_hours: 3,
    instructor: instructors[5],
    created_by: 1,
    capacity: 3
  },
  {
    title: "Artificial Intelligence",
    description: "Search algorithms, decision trees, and machine learning basics.",
    credit_hours: 4,
    instructor: instructors[6],
    created_by: 1,
    capacity: 3
  },
  {
    title: "Cloud Computing",
    description: "AWS, virtualization, and distributed storage systems.",
    credit_hours: 3,
    instructor: instructors[7],
    created_by: 1,
    capacity: 3
  }
])
