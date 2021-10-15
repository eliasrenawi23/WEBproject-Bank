import {createSlice} from '@reduxjs/toolkit';

export const global = createSlice({
  name: 'global',
  initialState: {
    isAddHomeworkHidden: true,
    ShowLogIn: false,
    ShowCourses: true,
    ShowCourse: true,
    ShowHomeWorks: true,
    isAddCourseHidden: true,
    ShowHomeWork: true,
    hideSubmissionDetails: true,
    currentHomeworkTitle: 'Homework',
    currentSubmissionStudentId: 'na',
    currentSubmission: null,
    currentUser: null,
    currentCourse: {
      title: 'Algorithms222',
      teacherName: 'Alex',
      id: 1,
    },
    currentCourseTitle: 'na',
    currentHomeworkStudent: {
      id: '1',
      title: 's',
      description: '',
      studentId: '123456789',
      HomeWorkId: '123',
      Name: 'Elias Renawi',
      updatedAt: '07/07/2021',
      status: 'Submitted',
      grade: '90',
      deadline: '07/07/2021',
      graderId: '111',
      graderfullname: 'aaa',
    },
    currentHomeworkStudentWithComments: {
      id: '1',
      title: 's',
      description: '',
      studentId: '123456789',
      Name: 'Elias Renawi',
      updatedAt: '07/07/2021',
      status: 'Submitted',
      grade: '90',
      deadline: '07/07/2021',
      AllCommentsSorted: 'This is homework2 of Web',
    },
    currentHomeworkTeacher: {
      id: '123',
      Title: 'HomeWork....',
      DeadLine: '07/07/20210000',
      Description: 'This is homework2 of Web',
    },
    currentStudentTeacherView: {
      id: '1',
      studentId: '123456789',
      HomeWorkId: '123',
      Name: 'Elias Renawi',
      updatedAt: '07/07/2021',
      status: 'Submitted',
      grade: '90',
      graderId: '111',
      graderfullname: 'aaa',
    },
    currentStudentTeacherViewWithComments: {
      id: '1',
      title: 's',
      description: '',
      studentId: '123456789',
      Name: 'Elias Renawi',
      updatedAt: '07/07/2021',
      status: 'Submitted',
      grade: '90',
      deadline: '07/07/2021',
      AllCommentsSorted: 'This is homework2 of Web',
    },
  },
  reducers: {
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setCurrentHomeworkStudent: (state, action) => {
      state.currentHomeworkStudent = action.payload;
    },
    setCurrentHomeworkStudentWithComments: (state, action) => {
      state.currentHomeworkStudentWithComments = action.payload;
    },
    setCurrentHomeworkTeachWithComments: (state, action) => {
      state.currentStudentTeacherViewWithComments = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentHomeworkTeacher: (state, action) => {
      state.currentHomeworkTeacher = action.payload;
    },
    setCurrStuTeachViewActive: (state, action) => {
      state.currentStudentTeacherView = action.payload;
    },
    setLogInActive: (state, action) => {
      state.ShowLogIn = action.payload;
    },
    setCoursesActive: (state, action) => {
      state.ShowCourses = action.payload;
    },
    setCourseActive: (state, action) => {
      state.ShowCourse = action.payload;
    },
    setHomeWorksActive: (state, action) => {
      state.ShowHomeWorks = action.payload;
    },
    setHomeWorkActive: (state, action) => {
      state.ShowHomeWork = action.payload;
    },
    setCurrentHomeworkTitle: (state, action) => {
      state.currentHomeworkTitle = action.payload;
    },
    setCurrentSubmission: (state, action) => {
      state.currentSubmission = action.payload;
    },
    setHideSubmissionDetails: (state, action) => {
      state.hideSubmissionDetails = action.payload;
    },
    setCurrentCourseTitle: (state, action) => {
      state.currentCourseTitle = action.payload;
    },
    setCurrentSubmissionStudentId: (state, action) => {
      state.currentSubmissionStudentId = action.payload;
    },
    setIsAddCourseHidden: (state, action) => {
      state.isAddCourseHidden = action.payload;
    },
    setIsAddHomeworkHidden: (state, action) => {
      state.isAddHomeworkHidden = action.payload;
    },
  },
});

export const {
  setIsAddCourseHidden,
  setCurrentCourse,
  setCourseActive,
  setCoursesActive,
  setCurrentHomeworkStudent,
  setCurrentHomeworkTeacher,
  setCurrentUser,
  setHomeWorkActive,
  setHomeWorksActive,
  setLogInActive,
  setCurrStuTeachViewActive,
  setCurrentHomeworkStudentWithComments,
  setCurrentHomeworkTeachWithComments,
  setCurrentHomeworkTitle,
  setCurrentSubmission,
  setHideSubmissionDetails,
  setCurrentCourseTitle,
  setCurrentSubmissionStudentId,
  setIsAddHomeworkHidden,
} = global.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const currentCourse = (state) => state.currentCourse;
export const currentHomeworkStudent = (state) => state.currentHomeworkStudent;
export const currentUser = (state) => state.currentUser;
export const currentHomeworkTeacher = (state) => state.currentHomeworkTeacher;
export const currStuTeachView = (state) => state.currentStudentTeacherView;
export const ShowLogIn = (state) => state.ShowLogIn;
export const ShowCourses = (state) => state.ShowCourses;
export const ShowCourse = (state) => state.ShowCourse;
export const ShowHomeWorks = (state) => state.ShowHomeWorks;
export const ShowHomeWork = (state) => state.ShowHomeWork;
export const CurrStudHWC = (state) => state.currentHomeworkStudentWithComments;
export const CurrTeachStudHWC = (state) =>
  state.currentStudentTeacherViewWithComments;
export const currentHomeworkTitle = (state) => state.currentHomeworkTitle;
export const currentSubmission = (state) => state.currentSubmission;
export const hideSubmissionDetails = (state) => state.hideSubmissionDetails;
export const currentCourseTitle = (state) => state.currentCourseTitle;
export const currentSubmissionStudentId = (state) =>
  state.currentSubmissionStudentId;
export const isAddCourseHidden = (state) => state.isAddCourseHidden;
export const isAddHomeworkHidden = (state) => state.isAddHomeworkHidden;
export default global.reducer;
