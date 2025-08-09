import employeeHelper from '../../helpers/employee.helper';

export async function addNewEmployeeHandler(input) {
    return await employeeHelper.addObject(input);
}

export async function getEmployeeDetailsHandler(input) {
    return await employeeHelper.getObjectById(input);
}

export async function updateEmployeeDetailsHandler(input) {
    return await employeeHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getEmployeeListHandler(input) {
    const list = await employeeHelper.getAllObjects(input);
    const count = await employeeHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteEmployeeHandler(input) {
    return await employeeHelper.deleteObjectById(input);
}

export async function getEmployeeByQueryHandler(input) {
    return await employeeHelper.getObjectByQuery(input);
}  
