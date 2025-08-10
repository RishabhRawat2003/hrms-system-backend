import attendanceHelper from '../../helpers/attendance.helper';

export async function addNewAttendanceHandler(input) {
    return await attendanceHelper.addObject(input);
}

export async function getAttendanceDetailsHandler(input) {
    return await attendanceHelper.getObjectById(input);
}

export async function updateAttendanceDetailsHandler(input) {
    const attendance = await attendanceHelper.getObjectById({ id: input.objectId });
    
    if (!attendance) {
        return await attendanceHelper.addObject(input.updateObject);
    }
    return await attendanceHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getAttendanceListHandler(input) {
    const list = await attendanceHelper.getAllObjects(input);
    const count = await attendanceHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteAttendanceHandler(input) {
    return await attendanceHelper.deleteObjectById(input);
}

export async function getAttendanceByQueryHandler(input) {
    return await attendanceHelper.getObjectByQuery(input);
}  
