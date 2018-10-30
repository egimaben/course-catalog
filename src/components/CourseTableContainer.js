import React from 'react'
import DataTable from './shared/DataTable'
import { connect } from 'react-redux';
import ConfirmDialog from './shared/ConfirmDialog';
import AppSnackBar from './shared/ActionStatusSnackBar'
import FormDialog from './shared/FormDialog';
import DetailDialog from './shared/DetailDialog';
const courseTableSchema = {
    id: { value: '', type: 'number', label: 'ID', readOnly: true, disablePadding: false },
    title: { value: '', type: 'text', label: 'Title', disablePadding: true },
    watchHref: { value: '', type: 'text', label: 'Link', disablePadding: true },
    author: { value: '', type: 'text', label: 'Author', disablePadding: true },
    length: { value: '', type: 'text', label: 'Length', disablePadding: true },
    category: { value: '', type: 'text', label: 'Category', disablePadding: true },
};
const createCourseRecord = (data) => {
    let record = {
        id: { value: data.id, type: 'number', label: 'ID', readOnly: true },
        title: { value: data.title, type: 'text', label: 'Title' },
        watchHref: { value: data.watchHref, type: 'text', label: 'Link' },
        author: { value: data.author, type: 'text', label: 'Author' },
        length: { value: data.length, type: 'text', label: 'Length' },
        category: { value: data.category, type: 'text', label: 'Category' },
    };
    return record;
}
const courseTableIdField = 'id';
const courseTableTitle = 'Course';
const courseBaseUrl = 'https://easy-serve.herokuapp.com/courses';
class CourseTableContainer extends React.Component {
    render() {
        const {
            onSave,
            onSaveError,
            onSaveEdits,
            onSaveNew,
            onDeleteError,
            onCoursesLoaded,
            courseData,
            onDeleteCompleted,
            onConfirmedDelete,
            onCancelledDelete,
            confirmDelete,
            confirmedDelete,
            deleteId,
            showConfirmDeleteDialog,
            closeSnackBar,
            displaySnackBar,
            snackBarVariant,
            snackBarMessage,
            closeFormDialog,
            showTableRowDetailView,
            onCloseDetailView,
            launchDetailView,
            detailViewData,
            dataToEdit,
            editing,
            creating,
            launchCreate,
            launchEdit,
            onFetchError,
            newRecord,
            editedRecord } = this.props;
        return (

            <React.Fragment>
                {showTableRowDetailView && <DetailDialog
                    open={showTableRowDetailView}
                    handleClose={onCloseDetailView}
                    data={detailViewData}
                    title={courseTableTitle + ' details'}
                />}
                {showConfirmDeleteDialog && <ConfirmDialog
                    open={showConfirmDeleteDialog}
                    message='Are you sure you want to delete this record'
                    onConfirmDelete={onConfirmedDelete}
                    onCancelDelete={onCancelledDelete} />}
                <AppSnackBar
                    closeSnackBar={closeSnackBar}
                    open={displaySnackBar}
                    messageVariant={snackBarVariant}
                    displayMessage={snackBarMessage} />
                {editing && <FormDialog save={onSaveEdits}
                    open={editing}
                    handleClose={closeFormDialog}
                    data={dataToEdit}
                    title={'Edit ' + courseTableTitle}
                />}
                {creating && <FormDialog save={onSaveNew}
                    open={creating}
                    handleClose={closeFormDialog}
                    data={dataToEdit}
                    title={'Create new ' + courseTableTitle}
                />}
                <DataTable
                    baseUrl={courseBaseUrl}
                    createRecord={createCourseRecord}
                    idField={courseTableIdField}
                    tableTitle={courseTableTitle}
                    tableSchema={courseTableSchema}
                    onFetchError={onFetchError}
                    onDeleteError={onDeleteError}
                    confirmDelete={confirmDelete}
                    confirmedDelete={confirmedDelete}
                    deleteId={deleteId}
                    onDeleteCompleted={onDeleteCompleted}
                    data={courseData}
                    onLoad={onCoursesLoaded}
                    onSave={onSave}
                    onSaveError={onSaveError}
                    launchCreate={launchCreate}
                    launchEdit={launchEdit}
                    creating={creating}
                    newRecord={newRecord}
                    editing={editing}
                    editedRecord={editedRecord}
                    launchDetailView={launchDetailView}
                />
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    closeSnackBar: state.home.closeSnackBar,
    displaySnackBar: state.home.displaySnackBar,
    snackBarVariant: state.home.snackBarVariant,
    snackBarMessage: state.home.snackBarMessage,
    confirmedDelete: state.home.confirmedDelete,
    deleteId: state.home.deleteId,
    showConfirmDeleteDialog: state.home.showConfirmDeleteDialog,
    courseData: state.home.courseData,
    dataToEdit: state.home.dataToEdit,
    editing: state.home.editing,
    creating: state.home.creating,
    newRecord: state.home.newRecord,
    editedRecord: state.home.editedRecord,
    showTableRowDetailView: state.home.showTableRowDetailView,
    detailViewData: state.home.detailViewData
})
const mapDispatchToProps = (dispatch) => ({
    onDeleteError: error => dispatch({ type: 'ON_DELETE_ERROR', error }),
    onFetchError: error => dispatch({ type: 'ON_FETCH_ERROR', error }),
    onSaveError: error => dispatch({ type: 'ON_SAVE_ERROR', error }),
    closeSnackBar: () => dispatch({ type: 'CLOSE_SNACKBAR' }),
    confirmDelete: (id) => dispatch({ type: 'CONFIRM_DELETE', id }),
    onConfirmedDelete: () => dispatch({ type: 'ON_CONFIRMED_DELETE' }),
    onCancelledDelete: () => dispatch({ type: 'ON_CANCELLED_DELETE' }),
    onDeleteCompleted: (data) => dispatch({ type: 'ON_DELETE_COMPLETED', data, modelName: 'courseData' }),
    onCoursesLoaded: (data) => dispatch({ type: 'COURSES_LOADED', courseData: data }),
    onSave: (data) => dispatch({ type: 'ON_SAVE', data, modelName: 'courseData' }),
    onSaveEdits: (data) => dispatch({ type: 'ON_SAVE_EDITS', data, modelName: 'courseData' }),
    onSaveNew: (data) => dispatch({ type: 'ON_SAVE_NEW', data, modelName: 'courseData' }),
    closeFormDialog: () => dispatch({ type: 'CLOSE_FORM_DIALOG' }),
    launchCreate: (schema) => dispatch({ type: 'LAUNCH_CREATE', schema, modelName: 'courseData' }),
    launchEdit: (data) => dispatch({ type: 'LAUNCH_EDIT', data, modelName: 'courseData' }),
    launchDetailView: (data) => dispatch({ type: 'LAUNCH_DETAIL_VIEWER', data }),
    onCloseDetailView: () => dispatch({ type: 'CLOSE_DETAIL_VIEWER' })
})
export default connect(mapStateToProps, mapDispatchToProps)(CourseTableContainer);