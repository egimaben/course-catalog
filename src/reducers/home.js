import { customSchemaToPlainObject } from '../components/utils/Utils';

export default (state = { courseData: [], authorData: [] }, action) => {
    switch (action.type) {
        case 'ON_FETCH_ERROR':
            return {
                ...state,
                displaySnackBar: true,
                snackBarMessage: action.error.message,
                snackBarVariant: 'error'
            };
        case 'ON_DELETE_ERROR':
            return {
                ...state,
                editing: false,
                displaySnackBar: true,
                snackBarMessage: action.error.message,
                snackBarVariant: 'error',
                confirmedDelete: false,
                showConfirmDeleteDialog: false
            }
        case 'CLOSE_SNACKBAR':
            return {
                ...state,
                displaySnackBar: false
            };
        case 'CONFIRM_DELETE':
            return {
                ...state,
                showConfirmDeleteDialog: true,
                deleteId: action.id,
                confirmedDelete: true
            };
        case 'ON_CONFIRMED_DELETE':
            return {
                ...state,
                showConfirmDeleteDialog: false
            }
        case 'ON_DELETE_COMPLETED':
            const { modelName, data } = action;
            return {
                ...state, editing: false,
                displaySnackBar: true,
                snackBarMessage: 'Successfully deleted',
                snackBarVariant: 'success',
                confirmedDelete: false,
                showConfirmDeleteDialog: false,
                [modelName]: data
            };
        case 'ON_CANCELLED_DELETE':
            return {
                ...state, showConfirmDeleteDialog: false,
                confirmedDelete: false
            };
        case 'AUTHORS_LOADED':
            const { authorData } = action;
            return {
                ...state, authorData
            }
        case 'COURSES_LOADED':
            const { courseData } = action;
            return {
                ...state, courseData
            }
        case 'ON_SAVE':
            return {
                ...state,
                creating: false,
                editing: false,
                dataToEdit: undefined,
                newRecord: undefined,
                editedRecord: undefined,
                displaySnackBar: true,
                snackBarMessage: 'Successfully created new record',
                snackBarVariant: 'success',
                [action.modelName]: action.data
            }
        case 'ON_SAVE_ERROR':
            return {
                ...state,
                editing: false,
                dataToEdit: undefined,
                newRecord: undefined,
                editedRecord: undefined,
                creating: false,
                displaySnackBar: true,
                snackBarMessage: action.error.message,
                snackBarVariant: 'error'
            }
        case 'ON_SAVE_EDITS':
            return {
                ...state,
                editedRecord: Object.assign({}, customSchemaToPlainObject(state.dataToEdit), action.data)
            }
        case 'ON_SAVE_NEW':
            return {
                ...state,
                newRecord: action.data
            }
        case 'LAUNCH_CREATE':
            return {
                ...state,
                dataToEdit: action.schema,
                creating: true
            }
        case 'LAUNCH_EDIT':
            return {
                ...state,
                dataToEdit: action.data,
                editing: true
            }
        case 'LAUNCH_DETAIL_VIEWER':
            return {
                ...state,
                showTableRowDetailView: true,
                detailViewData: action.data
            }
        case 'CLOSE_DETAIL_VIEWER':
            return {
                ...state,
                showTableRowDetailView: false,
                detailViewData: undefined
            }
        case 'CLOSE_FORM_DIALOG':
            return {
                ...state,
                dataToEdit: undefined,
                editing: false,
                creating: false,
                editedRecord: undefined,
                newRecord: undefined
            }
        default: return state;
    }
}