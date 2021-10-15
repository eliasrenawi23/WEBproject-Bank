const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const path = require('path');
const {v4: uuidv4} = require('uuid');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e4);
    cb(null, uniqueSuffix + '_e_e_e_' + file.originalname);
  },
});

var upload = multer({storage: storage});

// middleware
app.use(cors());
app.use(express.json());

// Add new Comment
app.post('/AddComment', async (req, res) => {
  try {
    const {
      authorid,
      authorfullname,
      authortype,
      submissionid,
      content,
    } = req.body;
    const createdat = new Date().toISOString();
    const updatedat = createdat;
    const id = await newIdFor('comment');
    const addComment = await pool.query(
      `INSERT INTO "public"."comment" ("id", "authorid", "authorfullname", "authortype", "submissionid", "createdat", "updatedat", "content") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        id,
        authorid,
        authorfullname,
        authortype,
        submissionid,
        createdat,
        updatedat,
        content,
      ]
    );
    res.json(addComment);
  } catch (error) {
    console.log(error);
  }
});

app.post('/AddHomework', async (req, res) => {
  try {
    const {cid, title, description, deadline} = req.body;
    const createdat = new Date().toISOString();
    const updatedat = createdat;
    const id = await newIdFor('homework');
    const addHomework = await pool.query(
      `INSERT INTO "public"."homework" ("id", "courseid", "title", "description", "deadline", "createdat", "updatedat") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [id, cid, title, description, deadline, createdat, updatedat]
    );
    res.json(id);
  } catch (error) {
    console.log(error);
  }
});

app.post('/AddCourse', async (req, res) => {
  try {
    const {title, description} = req.body;
    const createdat = new Date().toISOString();
    const updatedat = createdat;
    const id = await newIdFor('course');
    const addCourse = await pool.query(
      `INSERT INTO "public"."course" ("id", "title", "description", "points", "createdat", "updatedat") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [id, title, description, 5, createdat, updatedat]
    );
    res.json(id);
  } catch (error) {
    console.log(error);
  }
});
app.post('/AddCourseParticipant/:courseid/:personid', async (req, res) => {
  try {
    const {personid, courseid} = req.params;
    const createdat = new Date().toISOString();
    const updatedat = createdat;
    const id = uuidv4();
    const addCourseP = await pool.query(
      `INSERT INTO "public"."courseparticipants" ("id", "personid", "courseid", "createdat", "updatedat") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, personid, courseid, createdat, updatedat]
    );
    res.json(addCourseP);
  } catch (error) {
    console.log(error);
  }
});
// update submission
app.put('/submission', async (req, res) => {
  try {
    const {studentid, homeworkid, grade, id} = req.body;
    const updatedSub = await pool.query(
      `UPDATE "public"."submission" SET "studentid" = $1, "homeworkid" = $2, "grade" = $3 WHERE "id" = $4;`,
      [studentid, homeworkid, grade, id]
    );
    res.json(grade);
  } catch (error) {
    console.log(error);
  }
});
// update user
app.put('/Grade/:SubmissionId/:Grade', async (req, res) => {
  try {
    const {
      SubmissionId,
      grade,
      id,
      submitteddate,
      Status,
      graderId,
      graderFullName,
      homeworkId,
    } = req.body;
    console.log('grade and graderId', grade, graderId);
    const updateUser = await pool.query(
      'UPDATE submission SET grade = $1,status=$2,graderid=$3,graderfullname=$4 WHERE id = $5;',
      [grade, Status, graderId, graderFullName, SubmissionId]
    );
    res.json(grade);
  } catch (error) {
    console.log(error);
  }
});

app.get('/getAllUsersInCourse/:courseId', async (req, res) => {
  const {courseId} = req.params;
  try {
    const getAllUsers = await pool.query(
      `SELECT
        person."id", 
        person.fname, 
        person.lname, 
        person."type"
      FROM
        course
        INNER JOIN
        courseparticipants
        ON 
          course."id" = courseparticipants.courseid
        INNER JOIN
        person
        ON 
          person."id" = courseparticipants.personid
      WHERE
        course."id" = $1`,
      [courseId]
    );
    res.json(getAllUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/login/:id/:password', async (req, res) => {
  const {id, password} = req.params;
  try {
    const user = await pool.query(
      `SELECT
      *, 
      person."password"
    FROM
      person
    WHERE
      person."id" = $1 AND
      person."password" = $2`,
      [id, password]
    );
    res.json(user.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/getAllUsers', async (req, res) => {
  try {
    const getAllUsers = await pool.query(
      `SELECT
      person."id", 
      person.fname, 
      person.lname, 
      person."type"
    FROM
      person
    WHERE
    person."type" != 'admin'`
    );
    res.json(getAllUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

//get Student Comments
app.get('/getComments/:SubmissionId', async (req, res) => {
  try {
    const {SubmissionId} = req.params;
    const getStudentComments = await pool.query(
      `SELECT
        "comment".*
    FROM
        "comment"
    WHERE
        "comment"."submissionid" = $1`,
      [SubmissionId]
    );
    res.json(getStudentComments.rows);
  } catch (error) {
    console.log(error);
  }
});
//get student details
app.get('/getStudentDetails/:StudentId', async (req, res) => {
  try {
    const {StudentId} = req.params;
    const getStudentDetails = await pool.query(
      `SELECT
        *
    FROM
        "person"
    WHERE
        "person"."id"  =$1`,
      [StudentId]
    );
    res.json(getStudentDetails.rows);
  } catch (error) {
    console.log(error);
  }
});
//get the specific homework of student
app.get('/getAllStudentHomeWorks/:HomeWorkId', async (req, res) => {
  try {
    const {HomeWorkId} = req.params;
    const getStudentsHomeWorks = await pool.query(
      `SELECT
        "submission".*
    FROM
        "submission"
    WHERE
        "submission"."homeworkid" =$1`,
      [HomeWorkId]
    );
    res.json(getStudentsHomeWorks.rows);
  } catch (error) {
    console.log(error);
  }
});

//get the specific homework of student
app.get('/getStudentHomeWork/:SubmittedId', async (req, res) => {
  try {
    const {SubmittedId} = req.params;
    const getStudentHomeWork = await pool.query(
      `SELECT
        *
    FROM
        "submission"
    WHERE
        "submission"."id" =  $1`,
      [SubmittedId]
    );
    res.json(getStudentHomeWork.rows);
  } catch (error) {
    console.log(error);
  }
});
//get course homeworks

app.get('/getCourseHomeWorks/:courseId', async (req, res) => {
  try {
    const {courseId} = req.params;
    const getCourseHomeWorks = await pool.query(
      `SELECT
    "homework".id, 
	"homework".title, 
	"homework".deadline, 
	"homework".description
FROM
	"homework"
WHERE
	"homework"."courseid" = $1`,
      [courseId]
    );
    res.json(getCourseHomeWorks.rows);
  } catch (error) {
    console.log(error);
  }
});
//get the Home that the student submitted and not sumbitted

app.get('/getStudentCourseHomeWorks/:studentId/:courseId', async (req, res) => {
  try {
    const {studentId, courseId} = req.params;
    const getStudentHomeWorks = await pool.query(
      `SELECT
        "submission".*, 
        "homework".title, 
        "homework".deadline, 
        "homework".description
    FROM
        "homework"
        INNER JOIN
        "submission"
        ON 
            "homework"."id" = "submission"."homeworkid"
    WHERE
        "submission"."studentid" = $1 AND
        "homework"."courseid" = $2`,
      [studentId, courseId]
    );
    res.json(getStudentHomeWorks.rows);
  } catch (error) {
    console.log(error);
  }
});
// get all courses of user
app.get('/getUserCourses/:id', async (req, res) => {
  try {
    const {id} = req.params;
  
    const getUserCourses = await pool.query(
      `SELECT
      person.fname, 
      person.lname, 
      person."id", 
      person."type", 
      course.title, 
      course.description,
      course.id as cid
    FROM
      course
      INNER JOIN
      courseparticipants
      ON 
        course."id" = courseparticipants.courseid
      INNER JOIN
      person
      ON 
        courseparticipants.personid = person."id"
    WHERE
      course."id" IN ((SELECT
      course."id"
    FROM
      courseparticipants
      INNER JOIN
      course
      ON 
        courseparticipants.courseid = course."id"
      INNER JOIN
      person
      ON 
        courseparticipants.personid = person."id"
    WHERE
      person."id" = $1))`,
      [id]
    );
    // AND
    // person."type" = 'teacher'

    res.json(getUserCourses.rows);
  } catch (error) {
    console.log(error);
  }
});

// create a submission
app.post('/submission', async (req, res) => {
  try {
    const {studentid, homeworkid} = req.body;
    const createdat = new Date().toISOString();
    const updatedat = createdat;
    const grade = -1;
    const status = 'Waiting';
    const graderid = -1;
    const graderfullname = 'Not available';
    const id = Math.floor(Math.random() * 2147483646);
    const addUser = await pool.query(
      `INSERT INTO "public"."submission" ("id", "studentid", "homeworkid", "grade", "status", "createdat", "updatedat", "graderid", "graderfullname") VALUES ($9, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        studentid,
        homeworkid,
        grade,
        status,
        createdat,
        updatedat,
        graderid,
        graderfullname,
        id,
      ]
    );
    //user_id | user_name
    res.json(addUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// create a user
app.post('/user', async (req, res) => {
  try {
    const {id, fname, lname, password, type} = req.body;
    const createdat = new Date().toISOString();
    const updatedat = createdat;
    const addUser = await pool.query(
      'INSERT INTO person (id, fname, lname, password, type, createdat, updatedat) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, fname, lname, password, type, createdat, updatedat]
    );
    res.json(addUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// get all users
app.get('/getAllCourses', async (req, res) => {
  try {
    const getAllUsers = await pool.query('SELECT * FROM course;');
    res.json(getAllUsers.rows);
  } catch (error) {
    console.log(error);
  }
});
// get all users
app.get('/users', async (req, res) => {
  try {
    const getAllUsers = await pool.query('SELECT * FROM person;');
    res.json(getAllUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

// get user
app.get('/user/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const getAllUsers = await pool.query(
      'SELECT * FROM person WHERE  "person"."id" =$1;',
      [id]
    );
    res.json(getAllUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

// get all users
app.get('/getteachersfromcourse/:id/:type', async (req, res) => {
  try {
    const {id, type} = req.params;
    const getTeachers = await pool.query(
      `SELECT
        course.title, 
        "person"."fname", 
        "person"."lname", 
        "person"."type", 
        course."id"
    FROM
        course
        INNER JOIN
        "courseparticipants"
        ON 
            course."id" = "courseparticipants"."courseid"
        INNER JOIN
        "person"
        ON 
            "courseparticipants"."personid" = "person"."id"
    WHERE
        "person"."type" =$2 AND
        course."id" =$1`,
      [id, type]
    );
    res.json(getTeachers.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post('/getteachersfromcourse/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {type} = req.body;
    const getTeachers = await pool.query(
      `SELECT
        course.title, 
        "person"."fname", 
        "person"."type"
    FROM
        course
        INNER JOIN
        "courseparticipants"
        ON 
            course."id" = "courseparticipants"."courseid"
        INNER JOIN
        "person"
        ON 
            "courseparticipants"."personid" = "person"."id"
    WHERE
        "person"."type" = $2 AND
        course."id" = $1`,
      [id, type]
    );
    res.json(getTeachers.rows);
  } catch (error) {
    console.log(error);
  }
});

// get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const getUser = await pool.query(
      'SELECT * FROM users WHERE user_id = $1;',
      [id]
    );
    res.json(getUser.rows);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deleteUser = await pool.query(
      'DELETE FROM "public"."person" WHERE "id" = $1;',
      [id]
    );
    res.json('person deleted');
  } catch (error) {
    console.log(error);
  }
});
app.delete('/course/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deleteCourse = await pool.query(
      'DELETE FROM "public"."course" WHERE "id" = $1;',
      [id]
    );
    res.json('course deleted');
  } catch (error) {
    console.log(error);
  }
});

app.delete('/homework/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deleteUser = await pool.query(
      'DELETE FROM "public"."homework" WHERE "id" = $1;',
      [id]
    );
    res.json('Homework deleted');
  } catch (error) {
    console.log(error);
  }
});
app.put('/homework/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description, deadline} = req.body;
    const updateCourse = await pool.query(
      `UPDATE "public"."homework" SET "title" = $2, "description" = $3, "deadline" = $4 WHERE "id" = $1;`,
      [id, title, description, deadline]
    );
    res.json('course updated');
  } catch (error) {
    console.log(error);
  }
});
//
app.put('/course/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;
    const updateCourse = await pool.query(
      `UPDATE "public"."course" SET "title" = $2, "description" = $3 WHERE "id" = $1;`,
      [id, title, description]
    );
    res.json('course updated');
  } catch (error) {
    console.log(error);
  }
});
// update user
app.put('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {user_name} = req.body;
    const updateUser = await pool.query(
      'UPDATE users SET user_name = $1 WHERE user_id = $2;',
      [user_name, id]
    );
    res.json('User updated');
  } catch (error) {
    console.log(error);
  }
});

// delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deleteUser = await pool.query(
      'DELETE FROM users WHERE user_id = $1;',
      [id]
    );
    res.json('User deleted');
  } catch (error) {
    console.log(error);
  }
});

// get all users
app.get('/courses', async (req, res) => {
  const type = 'student';
  try {
    const getAllUsers = await pool.query(Elias('student'));
    res.json(getAllUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

////////////////////////////////////// files

app.post(
  '/uploadFile/:fkValue/:table/:fk',
  upload.single('file'),
  async function (req, res, next) {
    try {
      const currDate = new Date().toISOString();
      const {fkValue} = req.params;
      const {path, mimetype, originalname} = req.file;
      const table = req.params.table;
      const fk = req.params.fk;

      const id = await newIdFor(table);
      console.log('id=', id);
      const addFile = await pool.query(
        `INSERT INTO ${table} (path, ${fk}, mimetype, created_at, updated_at, title, id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [path, fkValue, mimetype, currDate, currDate, originalname, id]
      );
      res.json(addFile.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
);

// delete a user
app.delete('/file/:id/:table', async (req, res) => {
  try {
    const {id, table} = req.params;
    const deletedFile = await pool.query(
      `DELETE FROM ${table} WHERE id = $1;`,
      [id]
    );
    res.json('File deleted');
  } catch (error) {
    console.log(error);
  }
});

app.get('/files/:fk_value/:table/:fk', async (req, res) => {
  try {
    const {fk_value} = req.params;
    const table = req.params.table;
    const fk = req.params.fk;

    const getFiles = await pool.query(
      `SELECT ${table}.* FROM ${table} WHERE ${table}.${fk} = $1`,
      [fk_value]
    );
    res.json(getFiles.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get('/download/:id/:table', async (req, res) => {
  try {
    const id = req.params.id;
    const table = req.params.table;

    // get file from db
    const getFile = await pool.query(
      `SELECT ${table}.* FROM ${table} WHERE ${table}."id" = $1`,
      [id]
    );
    const file = getFile.rows[0];
    //
    const file_path = file.path;
    const file_mimetype = file.mimetype;

    res.set({
      'Content-Type': file_mimetype,
    });

    const full_path = path.join(__dirname, file_path);
    res.sendFile(full_path);
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

async function newIdFor(table) {
  try {
    const getNewId = await pool.query(
      `SELECT MAX("${table}"."id") FROM "${table}"`
    );
    const newId = getNewId.rows[0].max;
    if (newId === null) {
      return 0;
    } else {
      return newId + 1;
    }
  } catch (error) {
    console.log('error getting id for', table, error);
  }
}
///////////////// init server

app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
