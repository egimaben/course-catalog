import React from 'react'
import DataTable from './shared/DataTable'
import { connect } from 'react-redux';
import ConfirmDialog from './shared/ConfirmDialog';
import AppSnackBar from './shared/ActionStatusSnackBar'
import FormDialog from './shared/FormDialog';
import DetailDialog from './shared/DetailDialog';
const authorTableSchema = {
    id: { value: '', type: 'number', label: 'ID', readOnly: true, disablePadding: false },
    name: { value: '', type: 'text', label: 'Full Name', disablePadding: true },
    specialty: { value: '', type: 'text', label: 'Specialty', disablePadding: true },
};
const createAuthorRecord = (data) => {
    let record = {
        id: { value: data.id, type: 'number', label: 'ID', readOnly: true },
        name: { value: data.name, type: 'text', label: 'Full Name' },
        specialty: { value: data.specialty, type: 'text', label: 'Specialty' },
    };
    return record;
}
const authorTableIdField = 'id';
const authorTableTitle = 'Author';
const authorBaseUrl = 'https://easy-serve.herokuapp.com/authors';
class AuthorTableContainer extends React.Component {
    render() {
        const {
            onSave,
            onSaveError,
            onSaveEdits,
            onSaveNew,
            onDeleteError,
            onAuthorsLoaded,
            authorData,
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
                    title={authorTableTitle + ' details'}
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
                    title={'Edit ' + authorTableTitle}
                />}
                {creating && <FormDialog save={onSaveNew}
                    open={creating}
                    handleClose={closeFormDialog}
                    data={dataToEdit}
                    title={'Create new ' + authorTableTitle}
                />}
                <DataTable
                    baseUrl={authorBaseUrl}
                    createRecord={createAuthorRecord}
                    idField={authorTableIdField}
                    tableTitle={authorTableTitle}
                    tableSchema={authorTableSchema}
                    onFetchError={onFetchError}
                    onDeleteError={onDeleteError}
                    confirmDelete={confirmDelete}
                    confirmedDelete={confirmedDelete}
                    deleteId={deleteId}
                    onDeleteCompleted={onDeleteCompleted}
                    data={authorData}
                    onLoad={onAuthorsLoaded}
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
    authorData: state.home.authorData,
    dataToEdit: state.home.dataToEdit,
    editing: state.home.editing,
    creating: state.home.creating,
    newRecord: state.home.newRecord,
    editedRecord: state.home.editedRecord,
    showTableRowDetailView:state.home.showTableRowDetailView,
    detailViewData:state.home.detailViewData
})
const mapDispatchToProps = (dispatch) => ({
    onDeleteError: error => dispatch({ type: 'ON_DELETE_ERROR', error }),
    onFetchError: error => dispatch({ type: 'ON_FETCH_ERROR', error }),
    onSaveError: error => dispatch({ type: 'ON_SAVE_ERROR', error }),
    closeSnackBar: () => dispatch({ type: 'CLOSE_SNACKBAR' }),
    confirmDelete: (id) => dispatch({ type: 'CONFIRM_DELETE', id }),
    onConfirmedDelete: () => dispatch({ type: 'ON_CONFIRMED_DELETE' }),
    onCancelledDelete: () => dispatch({ type: 'ON_CANCELLED_DELETE' }),
    onDeleteCompleted: (data) => dispatch({ type: 'ON_DELETE_COMPLETED', data, modelName: 'authorData' }),
    onAuthorsLoaded: (data) => dispatch({ type: 'AUTHORS_LOADED', authorData: data }),
    onSave: (data) => dispatch({ type: 'ON_SAVE', data, modelName: 'authorData' }),
    onSaveEdits: (data) => dispatch({ type: 'ON_SAVE_EDITS', data, modelName: 'authorData' }),
    onSaveNew: (data) => dispatch({ type: 'ON_SAVE_NEW', data, modelName: 'authorData' }),
    closeFormDialog: () => dispatch({ type: 'CLOSE_FORM_DIALOG' }),
    launchCreate: (schema) => dispatch({ type: 'LAUNCH_CREATE', schema, modelName: 'authorData' }),
    launchEdit: (data) => dispatch({ type: 'LAUNCH_EDIT', data, modelName: 'authorData' }),
    launchDetailView:(data)=>dispatch({type:'LAUNCH_DETAIL_VIEWER',data}),
    onCloseDetailView:()=>dispatch({type:'CLOSE_DETAIL_VIEWER'})
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthorTableContainer);