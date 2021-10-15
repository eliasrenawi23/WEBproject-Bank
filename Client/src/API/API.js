import download from 'downloadjs';

const axios = require('axios');

export const API_URL = 'http://localhost:5000';

export const addSubmission = async (studentid, homeworkid) => {
  try {
    return await axios
      .post(API_URL + `/submission`, {
        studentid,
        homeworkid,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const addHomework = async (cid, title, description, deadline) => {
  try {
    return await axios
      .post(API_URL + `/AddHomework`, {
        cid,
        title,
        description,
        deadline,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const updateSubmissionGrade = async (
  id,
  studentid,
  homeworkid,
  grade
) => {
  try {
    return await axios
      .put(API_URL + `/submission`, {
        id,
        studentid,
        homeworkid,
        grade,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const updateHomework = async (id, title, description, deadline) => {
  try {
    return await axios
      .put(API_URL + `/homework/${id}`, {
        title,
        description,
        deadline,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const updateCourse = async (id, title, description) => {
  try {
    return await axios
      .put(API_URL + `/course/${id}`, {
        title,
        description,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const deleteUser = async (id) => {
  try {
    return await axios.delete(API_URL + `/user/${id}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};
export const deleteCourse = async (id) => {
  try {
    return await axios.delete(API_URL + `/course/${id}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteHomework = async (id) => {
  try {
    return await axios.delete(API_URL + `/homework/${id}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};
export const logIn = async (id, password) => {
  try {
    return await axios.get(API_URL + `/login/${id}/${password}`)
    .then((res) => {
      console.log(res)    
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};
export const deleteFile = async (id, table) => {
  try {
    return await axios.delete(API_URL + `/file/${id}/${table}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (id, fname, lname, password, type) => {
  try {
    return await axios
      .post(API_URL + `/user`, {
        id,
        fname,
        lname,
        password,
        type,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const addCourse = async (title, description) => {
  try {
    return await axios
      .post(API_URL + `/AddCourse`, {
        title,
        description,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const addParticipantToCourse = async (courseid, personid) => {
  try {
    return await axios
      .post(API_URL + `/AddCourseParticipant/${courseid}/${personid}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getAllUsersInCourse = async (courseId) => {
  try {
    return await axios
      .get(API_URL + `/getAllUsersInCourse/${courseId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getAllCourses = async () => {
  try {
    return await axios.get(API_URL + `/getAllCourses`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};
export const getAllUsers = async () => {
  try {
    return await axios.get(API_URL + `/getAllUsers`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};
export const sendComment = async (
  authorid,
  authorfullname,
  authortype,
  submissionid,
  content
) => {
  try {
    return await axios
      .post(API_URL + `/AddComment`, {
        authorid,
        authorfullname,
        authortype,
        submissionid,
        content,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getComments = async (SubmissionId) => {
  try {
    return await axios
      .get(API_URL + `/getComments/${SubmissionId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getStudentDetails = async (StudentId) => {
  try {
    return await axios
      .get(API_URL + `/getStudentDetails/${StudentId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getStudentsHomeWorks = async (HomeWorkId) => {
  try {
    return await axios
      .get(API_URL + `/getAllStudentHomeWorks/${HomeWorkId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getStudentHomeWork = async (SubmittedId) => {
  try {
    return await axios
      .get(API_URL + `/getStudentHomeWork/${SubmittedId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getCourseHomeWorks = async (courseId) => {
  try {
    return await axios
      .get(API_URL + `/getCourseHomeWorks/${courseId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getUser = async (id) => {
  try {
    return await axios
      .get(API_URL + `/user/${id}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getStudentHomeWorks = async (studentId, courseId) => {
  try {
    return await axios
      .get(API_URL + `/getStudentCourseHomeWorks/${studentId}/${courseId}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const getUsersFromCourse = async (id, type) => {
  try {
    return await axios
      .get(API_URL + `/getteachersfromcourse/${id}/${type}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getUserCourses = async (id) => {
  try {
    return await axios.get(API_URL + `/getUserCourses/${id}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsersFromCourseBody = async (id, type) => {
  try {
    return await axios
      .post(API_URL + `/getteachersfromcourse/${id}`, {
        type: type,
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getFiles = async (fkValue, fk, table) => {
  try {
    return await axios
      .get(API_URL + `/files/${fkValue}/${table}/${fk}`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async (file, fkValue, fk, table) => {
  try {
    const url = API_URL + `/uploadFile/${fkValue}/${table}/${fk}`;
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return await axios.post(url, formData, config).then((res) => {
      return res;
    });
  } catch (error) {}
};

export const downloadFile = async (id, table, path, mimetype) => {
  try {
    const result = await axios.get(`${API_URL}/download/${id}/${table}`, {
      responseType: 'blob',
    });
    const split = path.split('_e_e_e_');
    const filename = split[split.length - 1];
    return download(result.data, filename, mimetype);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // todo
    }
  }
};
