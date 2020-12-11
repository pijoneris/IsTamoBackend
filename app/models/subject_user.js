'subject_user strict';
const dbConn = require('../db');

//Mark object create
var SubjectUser = function(subjectUser) {}

SubjectUser.getSubjects = async (data) => {
    const [result,fields] = await dbConn.query("SELECT SUBJECT.* FROM SUBJECT_USER " +
    "LEFT JOIN SUBJECT ON SUBJECT.id=fk_subjectId " + 
    "WHERE fk_userId=?", [data.userId])
    return result
}

SubjectUser.getSubjectUser = async (data) => {
    const [result,fields] = await dbConn.query("SELECT * FROM SUBJECT_USER " +
    "WHERE id=?", [data.id])
    return result[0]
}

SubjectUser.createSubjectUser = async (data) => {
    const [result,fields] = await dbConn.query("INSERT INTO SUBJECT_USER " +
    "(fk_subjectId, fk_userId) VALUES " +
    "(?,?)", [data.subjectId, data.userId])
    return await SubjectUser.getSubjectUser({id: result.insertId})
}

SubjectUser.updateSubjectUser = async (data) => {
    await dbConn.query("UPDATE SUBJECT_USER SET " +
    "fk_subjectId=COALESCE(?,fk_subjectId), fk_userId=COALESCE(?,fk_userId) " +
    "WHERE id=?", 
    [data.subjectId, data.userId, data.id])
    return await SubjectUser.getSubjectUser({id: data.id})
}

SubjectUser.removeSubjectUser = async (data) => {
    const removed = SubjectUser.getSubjectUser({id: data.id})
    await dbConn.query("DELETE FROM SUBJECT_USER " +
    "WHERE id=?", [data.id])
    return removed
}

module.exports = SubjectUser